const { Post, Comment, Like } = require("../Models/blogModels");

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("comments likes");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, authorEmail } = req.body;
    const newPost = new Post({ title, content, authorEmail });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a comment
const addComment = async (req, res) => {
  try {
    const { postId, authorEmail, content } = req.body;
    const comment = new Comment({ postId, authorEmail, content });
    await comment.save();
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const { postId, userEmail } = req.body;
    const like = new Like({ postId, userEmail });
    await like.save();
    await Post.findByIdAndUpdate(postId, { $push: { likes: like._id } });
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, createPost, deletePost, addComment, likePost };
