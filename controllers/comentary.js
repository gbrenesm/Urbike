const Comment = require("../models/Comment")
const Post = require("../models/Post")

exports.createComentary =  async (req, res) => {
  const { content } = req.body
  const comment = await Comment.create({
    content,
    creatorId: req.user._id
  })
  await Post.findByIdAndUpdate(req.params.id, {$push: { comments: comment._id }})
  res.redirect(req.get('referer'))
}