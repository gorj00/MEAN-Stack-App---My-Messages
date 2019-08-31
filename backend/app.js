const express = require('express');
// Extracting body when using POST method
const bodyParser = require('body-parser');

const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully',
    post: post
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'rwqg5',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    {
      id: 's51d1',
      title: 'Second server-side post',
      content: 'This is coming from the server!'
    }
  ];
  // res.json(posts);
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
