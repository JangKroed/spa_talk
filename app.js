// express, portNumber
const express = require("express");
const app = express();
const port = 3000;

// express middleware
app.use(express.json());

// router
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const connect = require("./schemas");
connect();

// router middlewares
app.use([postsRouter]);
app.use([commentsRouter]);

// connect message
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸습니다.");
});
