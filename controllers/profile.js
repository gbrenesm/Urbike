exports.profileView = (req, res) =>{
  res.render("profile", req.user)
}