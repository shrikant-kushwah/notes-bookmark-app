// ===== backend/routes/noteRoutes.js =====
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authMiddleware = require('../utils/authMiddleware');

router.use(authMiddleware);

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.patch('/:id/favorite', noteController.toggleFavorite);

module.exports = router;