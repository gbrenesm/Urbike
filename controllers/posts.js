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
  res.redirect("/foro")
}

//R

exports.postsAll = async (req, res) => {
  const posts = await Post.find().populate("creatorId")
  const user = await User.findById(req.user)
  res.render("posts/allposts", { posts, user})
}

exports.postDetail = async (req, res) => {
  const user = await User.findById(req.user)
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
  res.render("posts/detailpost", post, user)
}

exports.userPostsView = async (req, res) => {
  const posts = await Post.find({ creatorId: req.user.id })
  res.render("posts/userposts", { posts })
}


/////Categorías//////
exports.postAyudaView = async (req, res) => {
  const postsAyuda = await Post.find({category: "Ayuda"}).populate("creatorId")
  const user = await User.findById(req.user)
  res.render("categories/ayuda", { postsAyuda, user })
}

exports.postRodadasView = async (req, res) => {
  const postsRodada = await Post.find({category: "Rodadas"}).populate("creatorId")
  const user = await User.findById(req.user)
  res.render("categories/rodadas", { postsRodada, user })
}

exports.postCicloviaView = async (req, res) => {
  const postsCiclovia = await Post.find({category: "Ciclovía"}).populate("creatorId")
  const user = await User.findById(req.user)
  res.render("categories/ciclovia", { postsCiclovia, user })
}

exports.postRecomendacionView = async (req, res) => {
  const postRecomendacion = await Post.find({category: "Recomendación"}).populate("creatorId")
  const user = await User.findById(req.user)
  res.render("categories/recomendacion", { postRecomendacion, user })
}

exports.postReparacionesView = async (req, res) => {
  const postsReparaciones = await Post.find({category: "Reparaciones"}).populate("creatorId")
  const user = await User.findById(req.user)
  res.render("categories/reparaciones", { postsReparaciones, user })
}

exports.postOtrosView = async (req, res) => {
  const postsOtros = await Post.find({category: "Otros"}).populate("creatorId")
  const user = await User.findById(req.user)
  res.render("categories/otros", { postsOtros, user })
}

//D

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.redirect("/profile/misposts")
}