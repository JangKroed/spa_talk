const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");

/**
 * 전체 게시글 목록 조회
 * 
 * 게시글ID, 작성자, 제목, 작성날짜 (내림차순)
 */
router.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });

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

/**
 * 게시글 상세 조회
 * 
 * 게시글ID, 작성자, 제목, 내용, 작성날짜
 */
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

  const [detail] = results.filter((post) => post.postId == _postId);

  res.json({
    data: detail,
  });
});

/**
 * 게시글 작성
 * 
 * 작성자, 비밀번호, 제목, 내용
 * + 작성날짜도 DB에 저장
 */
router.post("/posts", async (req, res) => {
  const { user, password, title, content, createdAt } = req.body;
  await Post.create({
    user,
    password,
    title,
    content,
    createdAt,
  });
  res.send({ message: "게시글을 생성하였습니다." });
});

/**
 * 게시글 수정
 * 
 * 비밀번호가 동일할 경우만 수정
 */
router.put("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password, title, content } = req.body;
  const putPost = await Post.find({ _id: _postId });

  const [insertWord] = putPost.filter((post) => {
    return {
      password: post.password,
    };
  });

  if (putPost.length && password == insertWord.password) {
    await insertWord.updateOne({ _id: _postId, $set: { title, content } });
    res.send({ message: "게시글을 수정하였습니다." });
  } else res.status(400).json({ errorMessge: "비밀번호가 맞지 않습니다" });
});

/**
 * 게시글 삭제
 * 
 * 비밀번호가 동일할경우만 삭제
 */
router.delete("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;

  const delPost = await Post.find({ _id: _postId });
  const [insertWord] = delPost.filter((post) => {
    return {
      password: post.password,
    };
  });

  if (delPost.length && password == insertWord.password) {
    await Post.deleteOne({ _id: _postId });
    res.send({ message: "게시글을 삭제하였습니다." });
  } else res.status(400).json({ errorMessge: "비밀번호가 맞지 않습니다" });
});

module.exports = router;
