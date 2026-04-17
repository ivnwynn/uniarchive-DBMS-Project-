const pool = require('../config/db');

const searchResearch = async (req, res) => {
  const { keyword, category, year, page = 1, limit = 10 } = req.query;
  try {
    
    let query = `
      SELECT r.research_id, r.title, r.abstract, r.academic_year, r.category, r.file_url, 
      GROUP_CONCAT(a.full_name) AS authors 
      FROM research r 
      LEFT JOIN research_authors ra ON r.research_id = ra.research_id 
      LEFT JOIN author a ON ra.author_id = a.author_id 
      WHERE 1=1`;
    
    const params = [];

    
    if (keyword) {
      query += ` AND (r.title LIKE ? OR r.abstract LIKE ?)`;
      params.push(`%${keyword}%`, `%${keyword}%`);
    }

    
    if (category && category !== 'All') {
      query += ` AND r.category = ?`;
      params.push(category);
    }

  
    if (year) {
      query += ` AND r.academic_year = ?`;
      params.push(year);
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    
    query += ` GROUP BY r.research_id ORDER BY r.research_id DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    const [results] = await pool.query(query, params);
    
    
    res.json(results); 
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const viewResearch = async (req, res) => {
  const { id } = req.params;
  try {
   
    const query = `
      SELECT r.*, GROUP_CONCAT(a.full_name) AS authors 
      FROM research r 
      LEFT JOIN research_authors ra ON r.research_id = ra.research_id 
      LEFT JOIN author a ON ra.author_id = a.author_id 
      WHERE r.research_id = ? 
      GROUP BY r.research_id
    `;

    const [rows] = await pool.query(query, [parseInt(id)]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Research not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('View error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { searchResearch, viewResearch };