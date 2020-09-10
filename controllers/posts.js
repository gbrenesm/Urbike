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


/////Categorías//////
exports.postAyudaView = async (req, res) => {
  const postsAyuda = await Post.find({category: "Ayuda"}).populate("creatorId")
  res.render("categories/ayuda", { postsAyuda })
}

exports.postRodadasView = async (req, res) => {
  const postsRodada = await Post.find({category: "Rodadas"}).populate("creatorId")
  res.render("categories/rodadas", { postsRodada })
}

exports.postCicloviaView = async (req, res) => {
  const postsCiclovia = await Post.find({category: "Ciclovía"}).populate("creatorId")
  res.render("categories/ciclovia", { postsCiclovia })
}

exports.postRecomendacionView = async (req, res) => {
  const postRecomendacion = await Post.find({category: "Recomendación"}).populate("creatorId")
  res.render("categories/recomendacion", { postRecomendacion })
}

exports.postReparacionesView = async (req, res) => {
  const postsReparaciones = await Post.find({category: "Reparaciones"}).populate("creatorId")
  res.render("categories/reparaciones", { postsReparaciones })
}

exports.postOtrosView = async (req, res) => {
  const postsOtros = await Post.find({category: "Otros"}).populate("creatorId")
  res.render("categories/otros", { postsOtros })
}

//D

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.redirect("/profile/misposts")
}