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

exports.postsAll = async (req, res) => {
  const posts = await Post.find().populate("creatorId")
  res.render("posts/allposts", posts)
}

exports.postDetail = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("creatorId")
  res.render("posts/detailpost", post)
}

exports.userPostsView = async (req, res) => {
  const user = await User.findById(req.user.id).populate("posts")
  console.log
  res.render("posts/userposts", user)
}
//U

//D

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.redirect("profile/misposts")
}