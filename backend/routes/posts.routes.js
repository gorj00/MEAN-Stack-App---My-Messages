const express =  require('express');
const Post = require('../models/post.model');

const router = express.Router();

// POST => /api/posts
router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // Mongoose save to mongoDB
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

// PUT => /api/posts/:id
router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    // without it new Post() creates new id, which is not allowed
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Update successful!' });
    })
    .catch(error => console.log(error));
});

// GET => /api/posts
router.get('', (req, res, next) => {
  // Use the model and its static methods by mongoose
  Post.find()
    .then(documents => {
      // res.json(posts);
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    })
    .catch(error => console.log(error));
});

// GET => /api/posts/:id
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found!' });
    }
  });
});

// DELETE => /api/posts/:id
router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then(result => console.log(result))
    .catch(error => console.log(error));
  res.status(200).json({
    message: 'Post deleted!'
  });
});

module.exports = router;
