const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");

// /?comments/:_postId ??
router.get("/comments", async (req, res) => {
  const comments = await Comment.find();

  const results = comments.map((ment) => {
    return {
      commentId: ment._id,
      user: ment.user,
      content: ment.content,
      createdAt: ment.createdAt,
    };
  });

  res.json({
    data: results,
  });
});
// /?comments/:_postId ??
router.post("/comments", async (req, res) => {
  const { user, password, content, createdAt } = req.body;

  await Comment.create({
    user,
    password,
    content,
    createdAt,
  });

  res.send({ message: "댓글을 생성하였습니다." });
});

module.exports = router;
