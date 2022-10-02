const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");

router.get("/posts", async (req, res) => {
  const posts = await Post.find();

  const results = posts.map((post) => {
    return {
      postId: post._id,
      user: post.user,
      title: post.title,
      createdAt: post.createdAt,
    };
  });

  res.json({
    data: results,
  });
});

router.get("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const posts = await Post.find();
  const results = posts.map((post) => {
    return {
      postId: post._id,
      user: post.user,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
    };
  });
  console.log(results);

  const [detail] = results.filter((post) => post.postId == _postId);

  res.json({
    data: detail,
  });
});

router.post("/posts", async (req, res) => {
  const { postId, user, password, title, content, createdAt } = req.body;
  await Post.create({
    postId,
    user,
    password,
    title,
    content,
    createdAt,
  });
  res.send({ message: "게시글을 생성하였습니다." });
});

module.exports = router;
