const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  _postId: {
    type: String,
  },
  user: {
    type: String,
  },
  password: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postsSchema);
