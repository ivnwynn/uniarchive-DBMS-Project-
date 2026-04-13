import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'https://buddhism-shaded-taps.ngrok-free.dev'

function Research() {
  const { id } = useParams()
  const [research, setResearch] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    const fetchResearch = async () => {
      try {
        const res = await axios.get(`${API}/api/research/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setResearch(res.data)
      } catch (err) {
        setError('Research not found.')
      }
    }
    fetchResearch()
  }, [id])

  if (error) return <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f87171', padding: '2rem' }}>{error}</div>
  if (!research) return <div style={{ minHeight: '100vh', background: '#0f172a', color: '#94a3b8', padding: '2rem' }}>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', borderBottom: '1px solid #1e293b' }}>
        <h1 onClick={() => navigate('/dashboard')} style={{ margin: 0, fontSize: '1.5rem', color: '#818cf8', cursor: 'pointer' }}>UniArchive</h1>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px', background: 'transparent', color: '#f1f5f9', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer' }}>Back to Dashboard</button>
      </nav>

      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 2rem' }}>
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '2rem' }}>
          <h2 style={{ margin: '0 0 0.5rem', color: '#f1f5f9' }}>{research.title}</h2>
          <p style={{ color: '#818cf8', margin: '0 0 1rem', fontSize: '14px' }}>{research.category} · {research.academic_year}</p>
          <hr style={{ border: 'none', borderTop: '1px solid #334155', marginBottom: '1.5rem' }} />
          <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}><span style={{ color: '#f1f5f9' }}>Authors:</span> {research.authors}</p>
          <p style={{ color: '#94a3b8', lineHeight: '1.8', marginBottom: '1.5rem' }}><span style={{ color: '#f1f5f9' }}>Abstract:</span> {research.abstract}</p>
          <a href={research.file_url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: '#4f46e5', color: '#fff', borderRadius: '6px', textDecoration: 'none' }}>View Full Paper</a>
        </div>
      </div>
    </div>
  )
}

export default Research