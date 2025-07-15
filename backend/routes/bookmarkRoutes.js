// ===== backend/routes/bookmarkRoutes.js =====
const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../utils/authMiddleware');

router.use(authMiddleware);

router.post('/', bookmarkController.createBookmark);
router.get('/', bookmarkController.getBookmarks);
router.get('/:id', bookmarkController.getBookmark);
router.put('/:id', bookmarkController.updateBookmark);
router.delete('/:id', bookmarkController.deleteBookmark);
router.patch('/:id/favorite', bookmarkController.toggleFavorite);

module.exports = router;