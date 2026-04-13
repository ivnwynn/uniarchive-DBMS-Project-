import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const name = localStorage.getItem('name')
  const token = localStorage.getItem('token')

  if (!token) {
    navigate('/login')
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', borderBottom: '1px solid #1e293b' }}>
        <h1 onClick={() => navigate('/dashboard')} style={{ margin: 0, fontSize: '1.5rem', color: '#818cf8', cursor: 'pointer' }}>UniArchive</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px', background: 'transparent', color: '#f1f5f9', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer' }}>Dashboard</button>
          <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>My <span style={{ color: '#818cf8' }}>Profile</span></h2>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700' }}>
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem' }}>{name}</h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>UniArchive Member</p>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #334155', marginBottom: '1.5rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Name</span>
              <span>{name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Role</span>
              <span>Researcher</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Status</span>
              <span style={{ color: '#4ade80' }}>Active</span>
            </div>
          </div>
        </div>

        <button onClick={handleLogout} style={{ width: '100%', padding: '12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile