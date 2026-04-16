const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const [existing] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
    if (existing.length > 0) return res.status(400).json({ message: 'Email already registered' })

    const hashedPw = await bcrypt.hash(password, 10)
    await pool.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPw])
    res.status(201).json({ message: 'Registered successfully' })
  } catch (err) {
    console.error('Register error:', err.message)
    res.status(500).json({ message: err.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
    if (rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' })

    const user = rows[0]
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
res.json({ token, name: user.name, role: user.role })
  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ message: err.message })
  }
}

module.exports = { register, login }