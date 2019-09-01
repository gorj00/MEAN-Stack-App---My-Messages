// 5.8 to play
const express = require('express');
// Extracting body when using POST method
const bodyParser = require('body-parser');
// Database connection
const mongoose = require('mongoose');

const Post = require('./models/post.model');

const app = express();

mongoose
  .connect(
    'mongodb+srv://gorj00:***REMOVED***@nodecluster-remtm.mongodb.net/mean_stack?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => console.log('Connection failed', error));

// Parses json data
app.use(bodyParser.json());
// Parses url data
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
  );
  next();
});

// Registering paths
app.post('/api/posts', (req, res, next) => {
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

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id, // without it new Post() creates new id, which is not allowed
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

app.get('/api/posts', (req, res, next) => {
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

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then(result => console.log(result))
    .catch(error => console.log(error));
  res.status(200).json({
    message: 'Post deleted!'
  });
});

module.exports = app;
