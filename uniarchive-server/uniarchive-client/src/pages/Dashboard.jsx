import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'https://buddhism-shaded-taps.ngrok-free.dev'

const CATEGORIES = ['AI', 'Cloud Computing', 'Computer Architecture', 'Computer Networks', 'Cybersecurity', 'Data Science', 'Embedded System', 'Internet Of Things', 'Machine Learning', 'Robotics']

function Dashboard() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [year, setYear] = useState('')
  const [results, setResults] = useState([])
  const [message, setMessage] = useState('')
  const [categoryPreviews, setCategoryPreviews] = useState({})
  const [searched, setSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const navigate = useNavigate()
  const LIMIT = 10

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    loadCategoryPreviews()
  }, [])

  const loadCategoryPreviews = async () => {
    const token = localStorage.getItem('token')
    const previews = {}
    for (const cat of CATEGORIES) {
      try {
        const res = await axios.get(`${API}/api/research/search`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { category: cat, keyword: '' }
        })
        if (!res.data.message) previews[cat] = res.data.slice(0, 3)
      } catch (err) {}
    }
    setCategoryPreviews(previews)
  }

  const handleSearch = async (newPage = 1) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${API}/api/research/search`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { keyword, category, year, page: newPage, limit: LIMIT }
      })
      if (res.data.message) {
        setMessage(res.data.message)
        setResults([])
        setTotalResults(0)
      } else {
        setResults(res.data.results || res.data)
        setTotalResults(res.data.total || res.data.length)
        setMessage('')
        setSearched(true)
        setPage(newPage)
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
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', borderBottom: '1px solid #1e293b' }}>
        <h1 onClick={() => { setSearched(false); setResults([]) }} style={{ margin: 0, fontSize: '1.5rem', color: '#818cf8', cursor: 'pointer' }}>UniArchive</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: '#94a3b8' }}>Hi, {localStorage.getItem('name')}!</span>
          <button onClick={() => navigate('/profile')} style={{ padding: '8px 16px', background: 'transparent', color: '#f1f5f9', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer' }}>Profile</button>
          <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input placeholder="Search keyword..." value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch(1)} style={{ flex: 1, padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }} />
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }}>
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} style={{ width: '90px', padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9' }} />
          <button onClick={() => handleSearch(1)} style={{ padding: '10px 20px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}>Search</button>
        </div>

        {!searched ? (
          <>
            <h2 style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>Browse by Category</h2>
            {CATEGORIES.map(cat => (
              <div key={cat} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ margin: 0, color: '#818cf8' }}>{cat}</h3>
                  <button onClick={() => { setCategory(cat); handleSearch(1); setSearched(true) }} style={{ padding: '4px 12px', background: 'transparent', color: '#818cf8', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>See all</button>
                </div>
                {categoryPreviews[cat] ? categoryPreviews[cat].map(r => (
                  <div key={r.research_id} onClick={() => navigate(`/research/${r.research_id}`)} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '1rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                    <h4 style={{ margin: '0 0 4px', color: '#f1f5f9', fontSize: '14px' }}>{r.title}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{r.academic_year} · {r.authors?.split(',')[0]}</p>
                  </div>
                )) : <p style={{ color: '#475569', fontSize: '13px' }}>Loading...</p>}
              </div>
            ))}
          </>
        ) : (
          <>
            {message && <p style={{ color: '#94a3b8' }}>{message}</p>}
            {results.map(r => (
              <div key={r.research_id} onClick={() => navigate(`/research/${r.research_id}`)} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem', cursor: 'pointer' }}>
                <h3 style={{ margin: '0 0 8px', color: '#f1f5f9' }}>{r.title}</h3>
                <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#818cf8' }}>{r.category} · {r.academic_year}</p>
                <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#64748b' }}>Authors: {r.authors}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{r.abstract.slice(0, 200)}...</p>
              </div>
            ))}

            {results.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}>
                <button onClick={() => handleSearch(page - 1)} disabled={page === 1} style={{ padding: '8px 16px', background: page === 1 ? '#1e293b' : '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Previous</button>
                <span style={{ color: '#94a3b8' }}>Page {page}</span>
                <button onClick={() => handleSearch(page + 1)} disabled={results.length < LIMIT} style={{ padding: '8px 16px', background: results.length < LIMIT ? '#1e293b' : '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: results.length < LIMIT ? 'not-allowed' : 'pointer' }}>Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard