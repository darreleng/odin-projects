const { Router } = require('express');
const router = Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.getAllComments);
router.post('/', commentController.createComment);
router.get('/:identifier', commentController.getComment);
router.delete('/:identifier', commentController.softDeleteComment);
// router.patch('/:identifier', commentController.updateComment);

module.exports = router;
