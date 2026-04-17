const pool = require('../config/db');

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    res.json({ message: 'User role updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllResearch = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM research ORDER BY research_id DESC LIMIT 50');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addResearch = async (req, res) => {
  const { title, abstract, academic_year, category, file_url, author_name } = req.body;
  try {
    
    const [result] = await pool.query(
      'INSERT INTO research (title, abstract, academic_year, category, file_url) VALUES (?, ?, ?, ?, ?)',
      [title, abstract, academic_year, category, file_url]
    );
    
    const newId = result.insertId; QL

    
    let authorName = author_name || 'Anonymous';
    const [authorResult] = await pool.query('INSERT INTO author (full_name) VALUES (?)', [authorName]);
    const authorId = authorResult.insertId;

    await pool.query('INSERT INTO research_authors (research_id, author_id) VALUES (?, ?)', [newId, authorId]);

    
    res.json({ 
      success: true, 
      message: `Research added to MySQL with ID: ${newId}`,
      id: newId 
    });
  } catch (err) {
    console.error("MySQL Insert Error:", err.message);
    res.status(500).json({ message: "Failed to add to database" });
  }
};

const updateResearch = async (req, res) => {
  const { id } = req.params;
  const { title, abstract, academic_year, category, file_url } = req.body;
  try {
    await pool.query(
      'UPDATE research SET title = ?, abstract = ?, academic_year = ?, category = ?, file_url = ? WHERE research_id = ?',
      [title, abstract, academic_year, category, file_url, id]
    );
    res.json({ message: 'Research updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteResearch = async (req, res) => {
  const { id } = req.params;
  
  try {

    await pool.query('DELETE FROM research_authors WHERE research_id = ?', [id]);

    const [result] = await pool.query('DELETE FROM research WHERE research_id = ?', [id]);

    res.json({ 
      success: true, 
      message: 'Successfully deleted from MySQL research and research_authors tables.' 
    });

  } catch (err) {
    console.error('MySQL Delete Error:', err.message);
    res.status(500).json({ message: 'Database failed to delete: ' + err.message });
  }
};

module.exports = { 
  getAllUsers, updateUserRole, deleteUser, 
  getAllResearch, addResearch, updateResearch, deleteResearch 
};
