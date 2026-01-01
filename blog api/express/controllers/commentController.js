const Comment = require('../models/commentModel');

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.getAllComments();
        if (comments.length === 0) return res.status(200).json({ message: "There are currently no comments."});
        res.status(200).json(comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to load comments.' });
    }
};

exports.getComment = async (req, res) => {
    const comment_id = req.params.id;
    try {
        const comment = await Comment.getComment(comment_id);
        if (!comment) return res.status(404).json({ message: `comment ${identifier} does not exist.` });
        res.status(200).json(comment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Failed to load comment ${identifier}` });
    }
}

exports.createComment = async (req, res) => {
    try {
        const { text, user_id, post_id } = req.body;
        const comment = await Comment.createComment(text, user_id, post_id);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to save comment." });
    }
};

exports.softDeleteComment = async (req, res) => {
    const comment_id = req.params.id;
    try {
        const comment = await Comment.softDeleteComment(comment_id);
        if (!comment) return res.status(404).json({ message: `comment ${identifier} does not exist.` });
        res.status(200).json(comment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Failed to delete comment ${identifier}` });
    }
};