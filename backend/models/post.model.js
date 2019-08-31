const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

// Mongoose will create collection posts
module.exports = mongoose.model('Post', postSchema);
 