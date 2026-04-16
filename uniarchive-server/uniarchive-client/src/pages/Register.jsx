import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API = 'https://buddhism-shaded-taps.ngrok-free.dev'

function getPasswordStrength(password) {
  if (password.length === 0) return { label: '', color: '' }
  if (password.length < 6) return { label: 'Weak', color: '#ef4444' }
  if (password.length < 10) return { label: 'Fair', color: '#f59e0b' }
  if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) return { label: 'Strong', color: '#22c55e' }
  return { label: 'Good', color: '#3b82f6' }
}

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const strength = getPasswordStrength(password)

  const validate = () => {
    if (!name.trim() || name.trim().length < 2) {
      setError('Please enter a valid full name.')
      return false
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return false
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return false
    }
    return true
  }

  const handleRegister = async () => {
    setError('')
    if (!validate()) return
    try {
      await axios.post(`${API}/api/auth/register`, { name, email, password })
      navigate('/login')
    } catch (err) {
      setError('Registration failed. Email might already exist.')
    }
  }

  const inputStyle = { display: 'block', width: '100%', marginBottom: '1rem', padding: '10px 12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', boxSizing: 'border-box' }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#1e293b', padding: '2.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
        <h1 style={{ color: '#818cf8', margin: '0 0 0.25rem', fontSize: '1.5rem' }}>UniArchive</h1>
        <h2 style={{ color: '#f1f5f9', margin: '0 0 2rem', fontSize: '1.1rem', fontWeight: '400' }}>Create an account</h2>

        {error && <p style={{ color: '#f87171', background: '#450a0a', padding: '10px', borderRadius: '6px', marginBottom: '1rem' }}>{error}</p>}

        <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />

        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />

        <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
          <input
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ ...inputStyle, marginBottom: 0, paddingRight: '70px' }}
          />
          <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', cursor: 'pointer', fontSize: '12px' }}>
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        {password && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ height: '4px', background: '#0f172a', borderRadius: '2px', marginBottom: '4px' }}>
              <div style={{ height: '4px', borderRadius: '2px', background: strength.color, width: strength.label === 'Weak' ? '25%' : strength.label === 'Fair' ? '50%' : strength.label === 'Good' ? '75%' : '100%', transition: 'width 0.3s' }} />
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: strength.color }}>{strength.label} password</p>
          </div>
        )}

        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <input
            placeholder="Confirm Password"
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{ ...inputStyle, marginBottom: 0, paddingRight: '70px' }}
          />
          <span onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', cursor: 'pointer', fontSize: '12px' }}>
            {showConfirm ? 'Hide' : 'Show'}
          </span>
        </div>

        <button onClick={handleRegister} style={{ width: '100%', padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}>Register</button>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>Already have an account? <Link to="/login" style={{ color: '#818cf8' }}>Login</Link></p>
        <p style={{ textAlign: 'center', color: '#94a3b8' }}><Link to="/" style={{ color: '#818cf8' }}>Back to Home</Link></p>
      </div>
    </div>
  )
}

export default Register