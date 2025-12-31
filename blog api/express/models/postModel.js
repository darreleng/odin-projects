const db = require('../db/pool');

exports.createPost = async (title, content, authorId) => {
    const query = 'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await db.query(query, [title, content, authorId]);
    return rows[0];
}

exports.getAllPosts = async () => {
    const { rows } = await db.query('SELECT * FROM posts WHERE deleted_at IS NULL ORDER BY created_at DESC');
    return rows;
};

exports.getPost = async (identifier) => {
    const query = 'SELECT * FROM posts WHERE deleted_at IS NULL AND (id::text = $1 OR title = $1)';
    const { rows } = await db.query(query, [identifier]);
    return rows;
};

exports.softDeletePost = async (identifier) => {
    const query = 'UPDATE posts SET deleted_at = CURRENT_TIMESTAMP WHERE id = (SELECT id FROM posts WHERE (id::text = $1 OR title = $1) AND deleted_at IS NULL ORDER BY (id::text = $1) DESC LIMIT 1) RETURNING *';
    const { rows } = await db.query(query, [identifier]);
    return rows;
}