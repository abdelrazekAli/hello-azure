require("dotenv").config();
require("./db/connection");
const express = require("express");
const app = express();
const postRouter = require("./routes/post.route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("./client/react-example/build/"));

app.get("/*", (req, res) => {
  res.sendFile("index.html", {
    root: `${__dirname}/client/react-example/build/`,
  });
});

app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
