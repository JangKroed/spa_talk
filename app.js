const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const connect = require("./schemas");
connect();

app.use([postsRouter]);
app.use([commentsRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸습니다.");
});
