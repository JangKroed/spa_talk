const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");

router.get("/comments/:_postId", async (req, res) => {
  const comment = await Comment.find().sort({ createdAt: -1 });
  const { _postId } = req.params;

  const comments = comment.filter((post) => post._postId == _postId);

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
router.post("/comments/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { user, password, content, createdAt } = req.body;

  if (!content.length) {
    res.status(400).json({ errorMessge: "댓글 내용을 입력해주세요." });
  } else {
    await Comment.create({
      _postId,
      user,
      password,
      content,
      createdAt,
    });

    res.send({ message: "댓글을 생성하였습니다." });
  }
});

router.put("/comments/:_commentId", async (req, res) => {
  const { _commentId } = req.params;
  const { password, content } = req.body;
  const putComment = await Comment.find({ _id: _commentId });

  const [insertWord] = putComment.filter((ment) => {
    return {
      password: ment.password,
    };
  });
  if (!content.length) {
    res.status(400).json({ errorMessge: "댓글 내용을 입력해주세요." });
  } else if (putComment.length && password == insertWord.password) {
    /**
     * 여기서 mongoose에서 직접 불러오면 (처음건 수정됨)
     * error Performing an update on the path '_id' would modify the immutable field '_id' 라고 나온다 ?
     */
    await insertWord.updateOne({ _id: _commentId, $set: { content } });
    res.send({ message: "댓글을 수정하였습니다." });
  } else res.status(400).json({ errorMessge: "비밀번호가 맞지 않습니다" });
});

router.delete("/comments/:_commentId", async (req, res) => {
  const { _commentId } = req.params;
  const { password } = req.body;

  const delComment = await Comment.find({ _id: _commentId });
  const [insertWord] = delComment.filter((ment) => {
    return {
      password: ment.password,
    };
  });

  if (delComment.length && password == insertWord.password) {
    await Comment.deleteOne({ _id: _commentId });
    res.send({ message: "댓글을 삭제하였습니다." });
  } else res.status(400).json({ errorMessge: "비밀번호가 맞지 않습니다" });
});

module.exports = router;
