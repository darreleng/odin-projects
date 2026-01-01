const db = require('../db/pool');

exports.createComment = async (text, user_id, post_id) => {
    const query = 'INSERT INTO comments (text, user_id, post_id) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await db.query(query, [text, user_id, post_id]);
    return rows[0];
}

exports.getAllComments = async () => {
    const { rows } = await db.query('SELECT * FROM comments WHERE deleted_at IS NULL ORDER BY created_at DESC');
    return rows;
};

exports.getComment = async (comment_id) => {
    const query = 'SELECT * FROM comments WHERE deleted_at IS NULL AND id::text = $1';
    const { rows } = await db.query(query, [comment_id]);
    return rows[0];
};

exports.softDeleteComment = async (comment_id) => {
    const query = 'UPDATE comments SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND deleted_at IS NULL RETURNING *';
    const { rows } = await db.query(query, [comment_id]);
    return rows[0];
}