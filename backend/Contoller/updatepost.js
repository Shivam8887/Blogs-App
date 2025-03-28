const {Post} = require('../Models/blogModels');
exports.updatepost = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, content} = req.body;
        if(id && title && content){
            const updatedPost = await Post.findByIdAndUpdate(id, {title, content});
            if(updatedPost){
                return res.status(201).json({message: "Post updated successfully!"});
            } else {
                return res.status(400).json({message: "Post not found."});
            }
    }
        }catch(err){
        console.log("Error in updating post");
        console.error(err);
        return res.status(501).json({message: "Unauthorized User."});
    }
}