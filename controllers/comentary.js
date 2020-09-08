const Comentary = require("../models/Comentary")

exports.createNewComentary = (req,res) => res.render("conctat")

exports.createComentary =  async (req, res) => {
  const { content } = req.body
  await Comentary.create({
    content,
    owner: req.user._id
  })
  res.redirect("/views/conctat")
}

exports.editComentary = async (req, res) => {
  const { content } = req.body
  await Comentary.findByIdAndUpdate(req.params.movieId,{
    content
  })
  res.render("/views/conctat")
}

exports.deleteComentary = async (req, res) => {
  await Comentary.findByIdAndDelete(req.params.movieId)
  res.redirect("/views/conctat")
}