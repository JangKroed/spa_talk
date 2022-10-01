const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");

router.get("/posts", async (req, res) => {
  const posts = await Post.find();

  const results = posts.map((post) => {
    return {
      id:post._id,
      postId: post.postId,
      user: post.user,
      title: post.title,
      createdAt: post.createdAt,
    };
  });

  res.json({
    data: results,
  });
});

router.post("/posts", async (req, res) => {
  const { postId, user, password, title, createdAt } = req.body;

  const posts = await Post.find({ postId });

  const createPosts = await Post.create({
    postId,
    user,
    password,
    title,
    createdAt,
  });

  res.json({ posts: createPosts });
});

module.exports = router;
