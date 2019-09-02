// 6.5 to play
const express = require('express');
// Extracting body when using POST method
const bodyParser = require('body-parser');
// Database connection
const mongoose = require('mongoose');
const password = require('./password.config');

const postRoutes = require('./routes/posts.routes');

const app = express();

mongoose
  .connect(
    'mongodb+srv://gorj00:' + password + '@nodecluster-remtm.mongodb.net/mean_stack?retryWrites=true&w=majority'
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

app.use('/api/posts', postRoutes);

module.exports = app;
