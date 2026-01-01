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

exports.getPostById = async (req, res) => {
    const post_id = req.params.id;
    try {
        const post = await Post.getPostById(post_id);
        if (!post) return res.status(404).json({ message: `Post ${post_id} does not exist.` });
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Failed to load post ${post_id}` });
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

exports.softDeletePostById = async (req, res) => {
    const post_id = req.params.id;
    const user_id = req.user.id;
    try {
        const post = await Post.getPostById(post_id);
        if (!post) return res.status(404).json({ error: `Post ${post_id} does not exist.` });
        if (post.author_id !== user_id) return res.status(403).json({ error: "Unauthorized: You can only delete your own posts" });
        await Post.softDeletePostById(post_id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Failed to delete post ${post_id}` });
    }
};

// exports.updatePost = (req, res) => {
//     res.status(200).json({ message: `Post ${req.params.id} updated!` })
// }