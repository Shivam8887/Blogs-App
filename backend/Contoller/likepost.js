const { Post } = require('../Models/blogModels');

exports.likePost = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        const isLiked = post.likes.includes(userId);
        if (isLiked) {
            return res.status(400).json({ message: "Post already liked." });
        }

        post.likes.push(userId);
        await post.save();

        return res.status(200).json({ 
            message: "Post liked.",
            totalLikes: post.likes.length  
        });

    } catch (err) {
        console.error("Error liking post:", err);
        return res.status(500).json({ message: "Server Error." });
    }
};
