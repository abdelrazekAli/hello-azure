const router = require("express").Router();
const Post = require("../models/post.model");

const randomText = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
});

router.post("/random", async (req, res) => {
  for (let i = 0; i < 5; i++) {
    try {
      const newPost = new Post({
        name: `Post ${(Math.random() * 100).toFixed()}`,
        text: `${randomText(30)}`,
        dateCreated: new Date(),
      });
      await newPost.save();
    } catch (err) {
      console.log(err);
    }
  }
  res.send("5 random posts added successfully");
});

router.post("/create", async (req, res) => {
  try {
    let { name, text } = req.body;
    let newPost = new Post({
      name: name,
      text: text,
      dateCreated: new Date(),
    });
    await newPost.save();
    return res.json(newPost);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    await Post.deleteMany({});
    return res.send("Successfully deleted all posts");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
