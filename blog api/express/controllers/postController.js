const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAllPosts();
        if (posts.length === 0) return res.status(200).json({ message: "There are currently no posts."});
        res.status(200).json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to load posts.' });
    }
};

exports.getPost = async (req, res) => {
    const { identifier } = req.params;
    try {
        const rows = await Post.getPost(identifier);
        if (rows.length === 0) return res.status(404).json({ message: `Post ${identifier} does not exist.` });
        const post = rows[0];
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Failed to load post ${identifier}` });
    }
}

exports.createPost = async (req, res) => {
    try {
        const post = await Post.createPost(req.body.title, req.body.content, req.user.id);
        res.status(201).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to save post." });
    }
};

exports.softDeletePost = async (req, res) => {
    const { identifier } = req.params;
    try {
        const rows = await Post.softDeletePost(identifier);
        if (rows.length === 0) return res.status(400).json({ message: `Post ${identifier} does not exist.` });
        const post = rows[0];
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Failed to delete post ${identifier}` });
    }
};

// exports.updatePost = (req, res) => {
//     res.status(200).json({ message: `Post ${req.params.id} updated!` })
// }