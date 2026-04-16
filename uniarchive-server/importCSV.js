const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const mysql = require('mysql2/promise')
require('dotenv').config()

const files = [
  'AI.csv',
  'Cloud-Computing.csv',
  'Computer-Architecture.csv',
  'Computer-Networks.csv',
  'Cybersecurity.csv',
  'Data-Science.csv',
  'Embedded-System.csv',
  'Internet-Of-Things.csv',
  'Machine-Learning.csv',
  'Robotics.csv'
]

async function importAll() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })

  for (const file of files) {
    const filePath = path.join(__dirname, 'data', file)
    const category = file.replace('.csv', '').replace(/-/g, ' ')
    const rows = []

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => rows.push(row))
        .on('end', resolve)
        .on('error', reject)
    })

    const researchValues = rows.map(row => [
      row['Document Title'] || '',
      row['Abstract'] || '',
      row['Publication Year'] || '',
      category,
      row['PDF Link'] || ''
    ])

    if (researchValues.length === 0) {
      console.log(`Skipped (empty): ${file}`)
      continue
    }

    const [resResult] = await pool.query(
      'INSERT INTO research (title, abstract, academic_year, category, file_url) VALUES ?',
      [researchValues]
    )

    const firstId = resResult.insertId
    const authorInserts = []
    const linkInserts = []

    rows.forEach((row, i) => {
      const researchId = firstId + i
      const authors = (row['Authors'] || '').split(';').map(a => a.trim()).filter(Boolean)
      authors.forEach(name => {
        authorInserts.push([name, researchId])
      })
    })

    for (const [name, researchId] of authorInserts) {
      const [authResult] = await pool.execute(
        'INSERT INTO author (full_name) VALUES (?)', [name]
      )
      linkInserts.push([researchId, authResult.insertId])
    }

    if (linkInserts.length > 0) {
      await pool.query(
        'INSERT INTO research_authors (research_id, author_id) VALUES ?',
        [linkInserts]
      )
    }

    console.log(`Imported: ${file} (${rows.length} records)`)
  }

  console.log('All files imported!')
  await pool.end()
}

importAll() 