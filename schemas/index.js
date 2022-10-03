const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://3.38.97.124:27017/AWS_spa_talk")
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
