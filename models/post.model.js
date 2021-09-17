const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  name: String,
  text: String,
  dateCreated: Date,
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
