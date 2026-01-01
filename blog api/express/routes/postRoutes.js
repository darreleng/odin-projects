const { Router } = require('express');
const router = Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/auth');

router.get('/', postController.getAllPosts);
router.post('/', verifyToken, postController.createPost);
router.get('/:identifier', postController.getPost);
router.delete('/:identifier', postController.softDeletePost);
// router.patch('/:identifier', postController.updatePost);

module.exports = router;

