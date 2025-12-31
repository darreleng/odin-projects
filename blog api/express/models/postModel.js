const db = require('../db/pool');

exports.createPost = async (title, content, authorId) => {
    const query = 'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await db.query(query, [title, content, authorId]);
    return rows[0];
}

exports.getAllPosts = async () => {
    const { rows } = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    return rows;
};

exports.getBySlug = async (slug) => {
    const query = `SELECT * FROM posts WHERE slug = $1`;
    const { rows } = await db.query(query, [slug]);
    return rows[0];
};