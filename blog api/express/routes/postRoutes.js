const { Router } = require('express');
const router = Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.get('/:slug', postController.getPostBySlug);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;

