const Post = require("../models/Post")
const User = require("../models/User")

//C
exports.newPostView = (req, res) => res.render("posts/newpost")

exports.newPostProcess = async (req, res) => {
  const { title, content, category } = req.body //TODO labels
  let post
  if (req.file){
    post = await Post.create({
      creatorId: req.user.id,
      title,
      content,
      category,
      photo: req.file.path,
    })
  } else {
    post = await Post.create({
      creatorId: req.user.id,
      title,
      content,
      category
    })
  }
  await User.findByIdAndUpdate(req.user.id, {$push: {posts: post._id}})
  res.redirect("/")
}

//R

exports.postsAll = async (req, res) => {
  const posts = await Post.find().populate("creatorId")
  res.render("posts/allposts", { posts })
}

exports.postDetail = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("creatorId")
    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "creatorId",
        model: "User"
      }
    })
  res.render("posts/detailpost", post)
}

exports.userPostsView = async (req, res) => {
  const posts = await Post.find({ creatorId: req.user.id })
  res.render("posts/userposts", { posts })
}

exports.postAyuda = async (req, res) => {
  const postayuda = await Post.find({category: "Ayuda"}).populate("creatorId")
  console.log(postayuda)
  res.render("categories/ayuda", { postayuda })
}

//D

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.redirect("/profile/misposts")
}