exports.blogs = async (req, res) => {
    if(!req.user){
        return res.status(500).json({Message:"Data not present in req.body"})
    }
    try {
        const { name, email } = req.user;
        
        return res.status(200).json({ name, email ,message:"Email and name are Received."}); 
    } catch (err) {
        console.error("Error in data sending:", err);
        return res.status(500).json({ message: "Internal Server Error." });
    }
};
