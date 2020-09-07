const Post = require("../models/Post")
const User = require("../models/User")

//C
exports.newPostView = (req, res) => res.render("posts/newpost")

exports.newPostProcess = async (req, res) => {
  const { title, content } = req.body //TODO labels
  const { path } = req.file
  let post
  if (req.file){
    post = await Post.create({
      creatorId: req.user.id,
      title,
      content,
      photo: path,
    })
  } else {
    post = await Post.create({
      creatorId: req.user.id,
      title,
      content,
    })
  }
  await User.findByIdAndUpdate(req.user.id, {$push: {posts: post._id}})
  res.redirect("/")
}
//R

exports.allPosts = (req, res) => res.render("posts/allposts")
//U
//D