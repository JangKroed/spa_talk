const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postsId: {
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
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postsSchema);
