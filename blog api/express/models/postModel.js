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

exports.getPostById = async (post_id) => {
    const query = 'SELECT * FROM posts WHERE deleted_at IS NULL AND id::text = $1';
    const { rows } = await db.query(query, [post_id]);
    return rows[0];
};

exports.softDeletePostById = async (post_id) => {
    const query = 'UPDATE posts SET deleted_at = CURRENT_TIMESTAMP WHERE id::text = $1 AND deleted_at IS NULL RETURNING *';
    const { rows } = await db.query(query, [post_id]);
    return rows[0];
}

exports.updatePostById = async (content, post_id) => {
    const query = 'UPDATE posts SET edited_at = CURRENT_TIMESTAMP, content = $1 WHERE id::text = $2 RETURNING *';
    const { rows } = await db.query(query, [content, post_id]);
    return rows[0];
}