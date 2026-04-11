import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [year, setYear] = useState('')
  const [results, setResults] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:5000/api/research/search', {
        headers: { Authorization: `Bearer ${token}` },
        params: { keyword, category, year }
      })
      if (res.data.message) {
        setMessage(res.data.message)
        setResults([])
      } else {
        setResults(res.data)
        setMessage('')
      }
    } catch (err) {
      setMessage('Search failed. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate('/')
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>UniArchive</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input placeholder="Search keyword..." value={keyword} onChange={e => setKeyword(e.target.value)} style={{ flex: 1, padding: '8px' }} />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '8px' }}>
          <option value="">All Categories</option>
          <option value="AI">AI</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Computer Architecture">Computer Architecture</option>
          <option value="Computer Networks">Computer Networks</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Data Science">Data Science</option>
          <option value="Embedded System">Embedded System</option>
          <option value="Internet Of Things">Internet Of Things</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Robotics">Robotics</option>
        </select>
        <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} style={{ width: '80px', padding: '8px' }} />
        <button onClick={handleSearch} style={{ padding: '8px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Search</button>
      </div>

      {message && <p style={{ color: 'gray' }}>{message}</p>}

      {results.map(r => (
        <div key={r.research_id} onClick={() => navigate(`/research/${r.research_id}`)} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', cursor: 'pointer' }}>
          <h3 style={{ margin: '0 0 8px' }}>{r.title}</h3>
          <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#666' }}>{r.category} · {r.academic_year}</p>
          <p style={{ margin: 0, fontSize: '13px' }}>{r.abstract.slice(0, 200)}...</p>
        </div>
      ))}
    </div>
  )
}

export default Dashboard