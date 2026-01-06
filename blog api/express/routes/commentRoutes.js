const { Router } = require('express');
const router = Router({ mergeParams: true} );
const commentController = require('../controllers/commentController');
const verifyToken = require('../middleware/auth');

router.get('/', commentController.getAllComments);
router.post('/', commentController.createComment);
router.get('/:commentId', commentController.getCommentById);
router.delete('/:commentId', verifyToken, commentController.softDeleteCommentById);

module.exports = router;
