const express = require('express')
const router = express.Router();
const Post = require('../models/Post');


// get back all of the posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch(err){
        res.json({messenger:err});
    }
});

// submits a post
router.post('/', async (req, res) => {
    // console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    } catch(err){
        res.json({message:err})
    }
});

// get back a specific post

router.get('/:postId', async (req, res) => {
    // console.log(req.params.postId)
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err){
        res.json({message:err})
    }
});

// Delete Post
router.delete('/:postId', async (req, res) => {
   const removedPost = Post.remove({_id: req.params.postId});
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try {
    const updatedPost = await Post.udpateOne(
        { _id: req.params.postId }, 
        { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
    } catch (err) {
        res.json({ message: err});
        }
    });

module.exports = router;