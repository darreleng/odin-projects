// const express = require('express');
// const path = require('node:path');
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use('/api/posts', postRoutes);
// app.use('/api/authors', authorRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, (error) => {
//   if (error) {
//     throw error;
//   }
//   console.log(`Express app listening on port ${PORT}!`);
// });

const express = require('express');
const cookieParser = require('cookie-parser');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser()); 

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});