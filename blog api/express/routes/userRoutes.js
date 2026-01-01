const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:identifier', userController.getUser);
// router.patch('/:identifier', userController.updateUser);
router.delete('/:identifier', userController.softDeleteUser);

module.exports = router;