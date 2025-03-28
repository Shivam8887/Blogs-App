const { Post } = require("../Models/blogModels");
exports.createpost = async (req, res) => {

    console.log(req.body);
    console.log(req.user);

    try {
        const { title, content } = req.body;
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Unauthorized access. Please log in." });
        }

        const { email } = req.user;
        console.log(title, content, email);

        if (title && content) {
            const postdata = await Post.create({ title, content, authorEmail: email });
            return res.status(201).json({ message: "Post Successfully Created", post: postdata });
        } else {
            return res.status(400).json({ message: "Please enter all the fields." });
        }
    } catch (err) {
        console.error("Error in insertion:", err);
        return res.status(500).json({ message: "Error in post creation on the server side." });
    }
};

