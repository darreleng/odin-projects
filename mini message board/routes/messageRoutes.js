import express from 'express';
import { getMessages, postMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get('/', getMessages);
router.get('/new', (req, res) => res.render('new'));
router.post('/new', postMessage);


export default router;

