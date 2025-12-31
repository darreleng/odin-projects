const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
    const posts = await Post.getAllPosts();
    res.status(200).json({ message: "Fetching all posts..." });
};

exports.getPostById = (req, res) => {
    res.status(200).json({ message: `Fetching post id ${req.params.id}` });
}

exports.getPostBySlug = async (req, res) => {
    const post = await Post.getBySlug(req.params.slug);
    
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // This is your "View" logic now:
    res.status(200).json({
        status: "success",
        data: post
    });
};

exports.createPost = async (req, res) => {
    try {
        console.log("Data received from Postman:", req.body);
        const post = await Post.createPost(req.body.title, req.body.content, req.body.authorId);
        res.status(201).json(post);
    } catch (err) {
        console.error("DATABASE ERROR:", err.message);
        res.status(500).json({ error: "Failed to save post" });
    }
};

exports.updatePost = (req, res) => {
    res.status(200).json({ message: `Post ${req.params.id} updated!` })
}

exports.deletePost = (req, res) => {
    res.status(200).json({ message: `Deleted post ${req.params.id}` });
};