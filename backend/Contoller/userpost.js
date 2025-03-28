const { Post } = require("../Models/blogModels");

exports.allpost = async (req,res)=>{
    try{
          const {email} = req.user;
          if(email){
              const allpostdata = await Post.find({authorEmail:email}).sort({createdAt:-1});
          res.status(201).json({data:allpostdata});
          }else{
            return res.status(400).json({ message: "Please enter all the fields." });
          }
    }catch(err){
        console.log("Error in fetching all user data ");
        console.error(err);
        return res.status(501).json({Messge :"Unauthorized User."})
    } 
    }
    