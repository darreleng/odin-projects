const db = require('../db/pool');

exports.createComment = async (text, user_id, post_id) => {
    const query = 'INSERT INTO comments (text, user_id, post_id) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await db.query(query, [text, user_id, post_id]);
    return rows[0];
}

exports.getByPostId = async (postId) => {
    const query = `
        SELECT 
            c.*, 
            u.username
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.post_id = $1 AND c.deleted_at IS NULL
        ORDER BY c.created_at DESC
    `;
    const { rows } = await db.query(query, [postId]);
    return rows;
};

exports.getAll = async () => {
    const query = `
        SELECT 
            c.*, 
            u.username, 
            p.title as post_title
        FROM comments c
        JOIN users u ON c.user_id = u.id
        JOIN posts p ON c.post_id = p.id
        WHERE c.deleted_at IS NULL
        ORDER BY c.created_at DESC
    `;
    const { rows } = await db.query(query);
    return rows;
};

exports.getCommentById = async (comment_id) => {
    const query = 'SELECT * FROM comments WHERE deleted_at IS NULL AND id::text = $1';
    const { rows } = await db.query(query, [comment_id]);
    return rows[0];
};

exports.softDeleteComment = async (comment_id) => {
    const query = 'UPDATE comments SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND deleted_at IS NULL RETURNING *';
    const { rows } = await db.query(query, [comment_id]);
    return rows[0];
}