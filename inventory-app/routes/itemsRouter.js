const { Router } = require('express');
const itemsController = require('../controllers/itemsController');
const itemsRouter = Router();

itemsRouter.get('/', itemsController.getItemsByCategory);
itemsRouter.post('/addItem', itemsController.addItemPost);
itemsRouter.post('/deleteItem', itemsController.deleteItemPost);
itemsRouter.get('/category/:categoryName', itemsController.getItemsByCategory);

module.exports = itemsRouter;

