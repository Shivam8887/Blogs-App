const express = require('express');
const { signup } = require('../Contoller/register');
const { login } = require('../Contoller/login');
const { auth } = require('../Contoller/auth');
const { blogs } = require('../Contoller/blogs');
const { getPosts, createPost, deletePost } = require('../Contoller/blogController');
const router = express.Router();


router.post('/signup',signup);
router.post('/login',login);
router.get('/blogs',auth,blogs);
router.get('/blogs/posts',auth,getPosts);
router.post('/blogs/posts',auth,createPost);
router.delete('/blogs/posts/:id',auth,deletePost)


module.exports = router;