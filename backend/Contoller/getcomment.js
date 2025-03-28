const { Post } = require("../Models/blogModels");

exports.getComments = async (req, res) => {
    try {
        const { postId } = req.params; // Get postId from request parameters

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required." });
        }

        const post = await Post.findById(postId).populate("comments"); // Populate comments

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        return res.status(200).json({ comments: post.comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
};
