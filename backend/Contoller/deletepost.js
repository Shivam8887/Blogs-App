const {Post} = require("../Models/blogModels"); 
exports.deletePost = async (req, res) => {  
    try {
        const { id } = req.params;
        if (id) {
            const deletedPost = await Post.findByIdAndDelete(id);
            if (deletedPost) {
                return res.status(201).json({ message: "Post deleted successfully!" }); 
            } else {
                return res.status(400).json({ message: "Post not found." });
            }
        } else {
            return res.status(400).json({ message: "Please enter all the fields." });
        }
    } catch (err) {
        console.log("Error in deleting post");
        console.error(err);
        return res.status(501).json({ message: "Unauthorized User." });
    }
}