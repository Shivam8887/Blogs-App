const { Post, Comment } = require("../Models/blogModels");

exports.commenthand = async (req, res) => {
    try {
        const { comment, postId } = req.body;
        const {email} = req.user; // Correct field names
        console.log("Incoming Request:", req.body);
        console.log("Req User :", req.user);

        if (!comment || !postId || !email) {
            return res.status(400).json({ message: "comment, Post ID, and Author Email are required." });
        }

        // Find post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Create new comment (Fix field names)
        const newComment = new Comment({ content:comment, postId, authorEmail:email });
        await newComment.save();

        // Ensure comments array exists
        if (!post.comments) {
            post.comments = [];
        }

        // Add comment reference to post
        post.comments.push(newComment._id);
        await post.save();

        // Populate comments
        await post.populate("comments");

        return res.status(200).json({
            message: "Comment added successfully!",
            postId,
            comments: post.comments,
        });

    } catch (err) {
        console.error("Error in comment handling:", err.message, err.stack);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};