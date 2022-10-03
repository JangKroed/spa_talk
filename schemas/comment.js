const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  _postId: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentsSchema);
