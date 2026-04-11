import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password })
      navigate('/')
    } catch (err) {
      setError('Registration failed. Email might already exist.')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>UniArchive Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '8px' }} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '8px' }} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '8px' }} />
      <button onClick={handleRegister} style={{ width: '100%', padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Register</button>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>Already have an account? <Link to="/">Login</Link></p>
    </div>
  )
}

export default Register