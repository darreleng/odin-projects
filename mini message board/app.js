import express from 'express';
import messageRoutes from './routes/messageRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

// Set the Template Engine
app.set('view engine', 'ejs');

// Use the Routes
app.use('/', messageRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));