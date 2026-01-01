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
        if (!post) return res.status(404).json({ message: `Post id: ${post_id} does not exist.` });
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Failed to load post id: ${post_id}` });
    }
}

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Post.createPost(title, content, req.user.id);
        res.status(201).json({ message: 'Post successfully created!'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to create post." });
    }
};

exports.softDeletePostById = async (req, res) => {
    const post_id = req.params.id;
    const user_id = req.user.id;
    try {
        const post = await Post.getPostById(post_id);
        if (!post) return res.status(404).json({ message: `Post id: ${post_id} does not exist.` });
        if (post.author_id !== user_id) return res.status(403).json({ error: "Unauthorized: You can only delete your own posts" });
        await Post.softDeletePostById(post_id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Failed to delete post id: ${post_id}` });
    }
};

exports.updatePostById = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const updatedPost = await Post.updatePostById(content, id);
        if (!updatedPost) return res.status(404).json({ message: `Post ${id} does not exist.` });
        res.status(200).json({ message: `Post ${id} updated!` })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Failed to update post id: ${id}` });
    }
}