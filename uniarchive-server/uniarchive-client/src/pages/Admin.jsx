import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'https://buddhism-shaded-taps.ngrok-free.dev'

function Admin() {
  const [users, setUsers] = useState([])
  const [research, setResearch] = useState([])
  const [tab, setTab] = useState('research')
  const [editResearch, setEditResearch] = useState(null)
  const [newResearch, setNewResearch] = useState({ title: '', abstract: '', academic_year: '', category: '', file_url: '' })
  const [showAddForm, setShowAddForm] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (!token || role !== 'admin') { navigate('/dashboard'); return }
    fetchUsers()
    fetchResearch()
  }, [])

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } })
    setUsers(res.data)
  }

  const fetchResearch = async () => {
    const res = await axios.get(`${API}/api/admin/research`, { headers: { Authorization: `Bearer ${token}` } })
    setResearch(res.data)
  }

  const handleDeleteUser = async (id) => {
    if (!confirm('Delete this user?')) return
    await axios.delete(`${API}/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    fetchUsers()
  }

  const handleUpdateRole = async (id, role) => {
    await axios.put(`${API}/api/admin/users/${id}`, { role }, { headers: { Authorization: `Bearer ${token}` } })
    fetchUsers()
  }

const handleDeleteResearch = async (id) => {
  if (!confirm('Delete this research?')) return;
  try {
  
    await axios.delete(`${API}/api/admin/research/${id}`, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    
  
    fetchResearch(); 
    
    alert('Deleted successfully from Database!');
  } catch (err) {
    alert('Delete failed: ' + err.message);
  }
};

  const handleUpdateResearch = async () => {
    await axios.put(`${API}/api/admin/research/${editResearch.research_id}`, editResearch, { headers: { Authorization: `Bearer ${token}` } })
    setEditResearch(null)
    fetchResearch()
  }

  const handleAddResearch = async () => {
    await axios.post(`${API}/api/admin/research`, newResearch, { headers: { Authorization: `Bearer ${token}` } })
    setNewResearch({ title: '', abstract: '', academic_year: '', category: '', file_url: '' })
    setShowAddForm(false)
    fetchResearch()
  }

  const inputStyle = { padding: '8px', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f1f5f9', width: '100%', boxSizing: 'border-box', marginBottom: '8px' }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', borderBottom: '1px solid #1e293b' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#818cf8' }}>UniArchive — Admin</h1>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px', background: 'transparent', color: '#f1f5f9', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer' }}>Back to Dashboard</button>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => setTab('research')} style={{ padding: '10px 20px', background: tab === 'research' ? '#4f46e5' : '#1e293b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Research</button>
          <button onClick={() => setTab('users')} style={{ padding: '10px 20px', background: tab === 'users' ? '#4f46e5' : '#1e293b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Users</button>
        </div>

        {tab === 'research' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>Research Records</h2>
              <button onClick={() => setShowAddForm(!showAddForm)} style={{ padding: '8px 16px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ Add Research</button>
            </div>

            {showAddForm && (
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem' }}>Add New Research</h3>
                <input placeholder="Title" value={newResearch.title} onChange={e => setNewResearch({ ...newResearch, title: e.target.value })} style={inputStyle} />
                <textarea placeholder="Abstract" value={newResearch.abstract} onChange={e => setNewResearch({ ...newResearch, abstract: e.target.value })} style={{ ...inputStyle, height: '80px', resize: 'vertical' }} />
                <input placeholder="Year" value={newResearch.academic_year} onChange={e => setNewResearch({ ...newResearch, academic_year: e.target.value })} style={inputStyle} />
                <input placeholder="Category" value={newResearch.category} onChange={e => setNewResearch({ ...newResearch, category: e.target.value })} style={inputStyle} />
                <input placeholder="File URL" value={newResearch.file_url} onChange={e => setNewResearch({ ...newResearch, file_url: e.target.value })} style={inputStyle} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleAddResearch} style={{ padding: '8px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
                  <button onClick={() => setShowAddForm(false)} style={{ padding: '8px 16px', background: '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            )}

            {editResearch && (
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem' }}>Edit Research</h3>
                <input placeholder="Title" value={editResearch.title} onChange={e => setEditResearch({ ...editResearch, title: e.target.value })} style={inputStyle} />
                <input placeholder="Year" value={editResearch.academic_year} onChange={e => setEditResearch({ ...editResearch, academic_year: e.target.value })} style={inputStyle} />
                <input placeholder="Category" value={editResearch.category} onChange={e => setEditResearch({ ...editResearch, category: e.target.value })} style={inputStyle} />
                <input placeholder="File URL" value={editResearch.file_url} onChange={e => setEditResearch({ ...editResearch, file_url: e.target.value })} style={inputStyle} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleUpdateResearch} style={{ padding: '8px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Update</button>
                  <button onClick={() => setEditResearch(null)} style={{ padding: '8px 16px', background: '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Year</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {research.map(r => (
                    <tr key={r.research_id} style={{ borderBottom: '1px solid #1e293b' }}>
                      <td style={{ padding: '10px', color: '#94a3b8' }}>{r.research_id}</td>
                      <td style={{ padding: '10px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</td>
                      <td style={{ padding: '10px', color: '#818cf8' }}>{r.category}</td>
                      <td style={{ padding: '10px' }}>{r.academic_year}</td>
                      <td style={{ padding: '10px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => setEditResearch(r)} style={{ padding: '4px 10px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                          <button onClick={() => handleDeleteResearch(r.research_id)} style={{ padding: '4px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'users' && (
          <>
            <h2 style={{ marginBottom: '1rem' }}>User Management</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #1e293b' }}>
                      <td style={{ padding: '10px', color: '#94a3b8' }}>{u.id}</td>
                      <td style={{ padding: '10px' }}>{u.name}</td>
                      <td style={{ padding: '10px', color: '#94a3b8' }}>{u.email}</td>
                      <td style={{ padding: '10px' }}>
                        <select value={u.role} onChange={e => handleUpdateRole(u.id, e.target.value)} style={{ padding: '4px 8px', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px', color: u.role === 'admin' ? '#818cf8' : '#94a3b8' }}>
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td style={{ padding: '10px' }}>
                        <button onClick={() => handleDeleteUser(u.id)} style={{ padding: '4px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Admin