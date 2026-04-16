const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { getAllUsers, updateUserRole, deleteUser, getAllResearch, addResearch, updateResearch, deleteResearch } = require('../controllers/adminController')

router.get('/users', protect, getAllUsers)
router.put('/users/:id', protect, updateUserRole)
router.delete('/users/:id', protect, deleteUser)
router.get('/research', protect, getAllResearch)
router.post('/research', protect, addResearch)
router.put('/research/:id', protect, updateResearch)
router.delete('/research/:id', protect, deleteResearch)

module.exports = router