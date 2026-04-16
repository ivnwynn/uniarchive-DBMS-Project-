const pool = require('../config/db')

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role FROM users')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateUserRole = async (req, res) => {
  const { id } = req.params
  const { role } = req.body
  try {
    await pool.query(`UPDATE users SET role = '${role}' WHERE id = ${parseInt(id)}`)
    res.json({ message: 'Role updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    await pool.query(`DELETE FROM users WHERE id = ${parseInt(id)}`)
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAllResearch = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT research_id, title, category, academic_year FROM research ORDER BY research_id DESC LIMIT 50')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const addResearch = async (req, res) => {
  const { title, abstract, academic_year, category, file_url } = req.body
  try {
    await pool.query(`INSERT INTO research (title, abstract, academic_year, category, file_url) VALUES (?, ?, ?, ?, ?)`, [title, abstract, academic_year, category, file_url])
    res.status(201).json({ message: 'Research added' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateResearch = async (req, res) => {
  const { id } = req.params
  const { title, abstract, academic_year, category, file_url } = req.body
  try {
    await pool.query(`UPDATE research SET title = ?, abstract = ?, academic_year = ?, category = ?, file_url = ? 
      WHERE research_id = ${parseInt(id)}`, [title, abstract, academic_year, category, file_url])
    res.json({ message: 'Research updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteResearch = async (req, res) => {
  const { id } = req.params
  try {
    await pool.query(`DELETE FROM research_authors WHERE research_id = ${parseInt(id)}`)
    await pool.query(`DELETE FROM research WHERE research_id = ${parseInt(id)}`)
    res.json({ message: 'Research deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getAllUsers, updateUserRole, deleteUser, getAllResearch, addResearch, updateResearch, deleteResearch }