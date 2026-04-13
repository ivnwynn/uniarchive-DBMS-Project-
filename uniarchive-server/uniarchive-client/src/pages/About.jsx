import { useNavigate } from 'react-router-dom'

function About() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', borderBottom: '1px solid #1e293b' }}>
        <h1 onClick={() => navigate('/')} style={{ margin: 0, fontSize: '1.5rem', color: '#818cf8', cursor: 'pointer' }}>UniArchive</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '8px 16px', background: 'transparent', color: '#f1f5f9', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer' }}>Login</button>
          <button onClick={() => navigate('/register')} style={{ padding: '8px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Get Started</button>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>About <span style={{ color: '#818cf8' }}>UniArchive</span></h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
          UniArchive is a centralized institutional repository designed to store and manage undergraduate thesis and capstone research projects in one convenient location.
        </p>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#818cf8', marginTop: 0 }}>The Problem</h3>
          <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: 0 }}>
            Each year, thousands of research papers are produced across various faculties and departments. These works are scattered across different sources, making it difficult for students and researchers to find citations related to their study field.
          </p>
        </div>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#818cf8', marginTop: 0 }}>Our Solution</h3>
          <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: 0 }}>
            UniArchive consolidates research data from IEEE Xplore into a single searchable platform. Every document is provided with key information such as title, abstract, authors, date of publication, and category — all in one place.
          </p>
        </div>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#818cf8', marginTop: 0 }}>The Team — Group 8</h3>
          <ul style={{ color: '#94a3b8', lineHeight: '2', margin: 0, paddingLeft: '1.5rem' }}>
            <li>Catungal, Kerwin Jan</li>
            <li>Malabanan, Nadine</li>
            <li>Que, Josef Leroy</li>
            <li>Rodriguez, Obi Christian</li>
            <li>San Juan, Ivan Wayne</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/register')} style={{ padding: '12px 28px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>Get Started</button>
          <button onClick={() => navigate('/')} style={{ padding: '12px 28px', background: 'transparent', color: '#f1f5f9', border: '1px solid #334155', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>Back to Home</button>
        </div>
      </div>
    </div>
  )
}

export default About