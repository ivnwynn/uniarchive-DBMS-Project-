import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', borderBottom: '1px solid #1e293b' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#818cf8' }}>UniArchive</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/about')} style={{ padding: '8px 16px', background: 'transparent', color: '#f1f5f9', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer' }}>About</button>
          <button onClick={() => navigate('/login')} style={{ padding: '8px 16px', background: 'transparent', color: '#f1f5f9', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer' }}>Login</button>
          <button onClick={() => navigate('/register')} style={{ padding: '8px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Get Started</button>
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', lineHeight: 1.2 }}>
          Your centralized hub for<br />
          <span style={{ color: '#818cf8' }}>academic research</span>
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', marginBottom: '2rem' }}>
          UniArchive brings together thousands of research papers from IEEE Xplore in one place. Search, filter, and discover studies relevant to your field.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/register')} style={{ padding: '12px 28px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>Get Started</button>
          <button onClick={() => navigate('/about')} style={{ padding: '12px 28px', background: 'transparent', color: '#f1f5f9', border: '1px solid #334155', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>Learn More</button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', padding: '3rem', borderTop: '1px solid #1e293b', textAlign: 'center' }}>
        <div>
          <h3 style={{ fontSize: '2rem', color: '#818cf8', margin: '0 0 4px' }}>9,969</h3>
          <p style={{ color: '#94a3b8', margin: 0 }}>Research Papers</p>
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', color: '#818cf8', margin: '0 0 4px' }}>10</h3>
          <p style={{ color: '#94a3b8', margin: 0 }}>Categories</p>
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', color: '#818cf8', margin: '0 0 4px' }}>34,402</h3>
          <p style={{ color: '#94a3b8', margin: 0 }}>Authors</p>
        </div>
      </div>
    </div>
  )
}

export default Home