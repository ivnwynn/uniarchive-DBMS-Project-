import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API = 'https://buddhism-shaded-taps.ngrok-free.dev'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.name)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#1e293b', padding: '2.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
        <h1 style={{ color: '#818cf8', margin: '0 0 0.25rem', fontSize: '1.5rem' }}>UniArchive</h1>
        <h2 style={{ color: '#f1f5f9', margin: '0 0 2rem', fontSize: '1.1rem', fontWeight: '400' }}>Sign in to your account</h2>
        {error && <p style={{ color: '#f87171', background: '#450a0a', padding: '10px', borderRadius: '6px', marginBottom: '1rem' }}>{error}</p>}
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '10px 12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', boxSizing: 'border-box' }} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '1.5rem', padding: '10px 12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', boxSizing: 'border-box' }} />
        <button onClick={handleLogin} style={{ width: '100%', padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}>Login</button>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>No account? <Link to="/register" style={{ color: '#818cf8' }}>Register</Link></p>
        <p style={{ textAlign: 'center', color: '#94a3b8' }}><Link to="/" style={{ color: '#818cf8' }}>Back to Home</Link></p>
      </div>
    </div>
  )
}

export default Login