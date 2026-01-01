const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to get users'});
    }
}

exports.getUser = async (req, res) => {
    const { identifier } = req.params;
    try {
        const user = await User.getUser(identifier);
        if (!user) return res.status(404).json({ message: `User ${identifier} not found.` });
        res.status(200).json(user.username);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: `Failed to find user ${identifier}`})
    }
}

exports.softDeleteUser = async (req, res) => {
    const { identifier } = req.params;
    try {
        const rows = await User.softDeleteUser(identifier);
        if (rows.length === 0) return res.status(404).json({ message: `User ${identifier} not found.`});
        const deletedUser = rows[0];
        res.status(200).json({ message: `Successfully deleted user: ${deletedUser.username} ID: ${deletedUser.id}`});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to delete user'});
    }
}

// exports.updateUser = async (req, res) => {
    
// }