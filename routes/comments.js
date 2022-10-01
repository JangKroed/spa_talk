const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");

// /?comments/:_postId ??
router.get("/comments/:_postId", async (req, res) => {
  const comments = await Comment.find();

  const results = comments.map((ment) => {
    return {
      commentsId: ment.commentsId,
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
router.post("/comments/:_postId", async (req, res) => {
  const { commentsId, user, content, createdAt } = req.body;

  const comments = await Comment.find({ commentsId });

  const createComments = await Comment.create({
    commentsId,
    user,
    content,
    createdAt,
  });

  res.json({ comments: createComments });
});

module.exports = router;
