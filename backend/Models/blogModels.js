const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorEmail: { type: String, required: true },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }]  
    },
    { timestamps: true } 
);

const CommentSchema = new mongoose.Schema(
    {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
        authorEmail: { type: String, required: true },
        content: { type: String, required: true }
    },
    { timestamps: true }
);

const LikeSchema = new mongoose.Schema(
    {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
        userEmail: { type: String, required: true, unique: true }  // Prevent duplicate likes
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Like = mongoose.model('Like', LikeSchema);

module.exports = { Post, Comment, Like };
