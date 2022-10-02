const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  _commentId: {
    type: String,
  },
  user: {
    type: String,
  },
  password: {
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

module.exports = mongoose.model("Comment", commentsSchema);
