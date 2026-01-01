const { Router } = require('express');
const router = Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/auth');

router.get('/', postController.getAllPosts);
router.post('/', verifyToken, postController.createPost);
router.get('/:identifier', postController.getPostById);
router.delete('/:id', verifyToken, postController.softDeletePostById);
// router.patch('/:identifier', postController.updatePost);

module.exports = router;

