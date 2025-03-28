const express = require('express');
const { signup } = require('../Contoller/register');
const { login } = require('../Contoller/login');
const { auth } = require('../Contoller/auth');
const { blogs } = require('../Contoller/blogs');
const {createpost} = require('../Contoller/createpost')
const  {allpost} = require('../Contoller/userpost')
const {deletePost} = require('../Contoller/deletepost')
const { getPosts, createPost } = require('../Contoller/blogController');
const { updatepost } = require('../Contoller/updatepost');
const { allpostdata } = require('../Contoller/allpost');
const { likePost } = require('../Contoller/likepost');
const {commenthand} = require('../Contoller/comment');
const {getComments} = require('../Contoller/getcomment');
const router = express.Router();


router.post('/signup',signup);
router.post('/login',login);
router.get('/blogs',auth,blogs);
router.get('/blogs/posts',auth,getPosts);
router.post('/blogs/posts',auth,createPost);
router.delete('/blogs/posts/:id',auth,deletePost)
router.post('/createpost',auth,createpost)
router.get('/allpost',auth,allpost)
router.delete('/deletepost/:id',auth,deletePost)
router.put('/updatepost/:id',auth,updatepost)


// For allPost 
router.get('/allpost/data', auth, allpostdata);
router.post('/allpost/like', auth, likePost);
router.post('/comment',auth,commenthand);
router.get('/comment/:postId',auth,getComments);

module.exports = router;