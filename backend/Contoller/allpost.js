const {Post}= require('../Models/blogModels');        
exports.allpostdata = async (req, res) => {
    try{
        const allpostdata = await Post.find().sort({createdAt:-1});
        res.status(201).json({
            data: allpostdata, 
            totalLikes: allpostdata.reduce((sum, post) => sum + (post.likes?.length || 0), 0)
          });
                    
    
    }catch(err){
        console.log("error in fetching all post data");
        console.error(err);
        return res.status(501).json({message:"Unauthorized User."});
    }
}