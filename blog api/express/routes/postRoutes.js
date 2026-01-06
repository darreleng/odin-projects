const { Router } = require('express');
const router = Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/auth');
const commentRouter = require('./commentRoutes');

router.get('/', postController.getAllPosts);
router.post('/', verifyToken, postController.createPost);
router.get('/:postId', postController.getPostById);
router.delete('/:postId', verifyToken, postController.softDeletePostById);
router.patch('/:postId', verifyToken, postController.updatePostById);
router.use('/:postId/comments', commentRouter);

module.exports = router;

