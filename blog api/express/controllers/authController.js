const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.createUser(username, hashedPassword);
        res.status(201).json({ message: "User created!", user: newUser.username, id: newUser.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Signup failed" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.getUser(username); 
        if (!user) return res.status(401).json({ error: `${username} does not exist.` });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logged out successfully" });
};