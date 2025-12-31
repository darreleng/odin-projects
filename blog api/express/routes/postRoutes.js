const { Router } = require('express');
const router = Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:identifier', postController.getPost);
router.delete('/:identifier', postController.softDeletePost);
// router.patch('/:identifier', postController.updatePost);

module.exports = router;

