import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Research() {
  const { id } = useParams()
  const [research, setResearch] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://localhost:5000/api/research/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setResearch(res.data)
      } catch (err) {
        setError('Research not found.')
      }
    }
    fetchResearch()
  }, [id])

  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>
  if (!research) return <p style={{ padding: '2rem' }}>Loading...</p>

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '1rem' }}>
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '1rem', padding: '8px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Back</button>
      <h2>{research.title}</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>{research.category} · {research.academic_year}</p>
      <p><strong>Authors:</strong> {research.authors}</p>
      <p><strong>Abstract:</strong> {research.abstract}</p>
      <a href={research.file_url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1rem', padding: '10px 16px', background: '#4f46e5', color: '#fff', borderRadius: '6px', textDecoration: 'none' }}>View Full Paper</a>
    </div>
  )
}

export default Research