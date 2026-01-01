const db = require('../db/pool');

exports.createUser = async (username, hashedPassword) => {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const { rows } = await db.query(query, [username, hashedPassword]);
    return rows[0];
}

exports.getUser = async (identifier) => {
    const query = 'SELECT * FROM users WHERE deleted_at IS NULL AND (id::text = $1 OR username = $1) ORDER BY (id::text = $1) DESC LIMIT 1';
    const { rows } = await db.query(query, [identifier]);
    return rows[0];
}

exports.getAllUsers = async () => {
    const { rows } = await db.query('SELECT * FROM users WHERE deleted_at IS NULL');
    return rows;
}

exports.softDeleteUser = async (identifier) => {
    // const query = 'DELETE FROM users WHERE id = (SELECT id FROM users WHERE id::text = $1 OR username = $1 ORDER BY (id::text = $1) DESC LIMIT 1) RETURNING *';
    const query = 'UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = (SELECT id FROM users WHERE id::text = $1 OR username = $1 ORDER BY (id::text = $1) DESC LIMIT 1) RETURNING *';
    const { rows } = await db.query(query, [identifier]);
    return rows;
}

// exports.updateUser = async (req, res) => {
//     const query = 'UPDATE'
// }