const express = require('express')
const router = express.Router()
const { searchResearch, viewResearch } = require('../controllers/searchController')
const protect = require('../middleware/authMiddleware')

router.get('/search', protect, searchResearch)
router.get('/:id', protect, viewResearch)

module.exports = router