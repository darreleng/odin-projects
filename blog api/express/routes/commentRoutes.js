const { Router } = require('express');
const router = Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middleware/auth');

router.get('/', commentController.getAllComments);
router.post('/', commentController.createComment);
router.get('/:id', commentController.getCommentById);
router.delete('/:id', verifyToken, commentController.softDeleteCommentById);

module.exports = router;
