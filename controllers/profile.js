const User = require("../models/User")

exports.profileView = (req, res) => {
  res.render("profile/profile", req.user)
}

exports.configUserView = (req, res) => {
  res.render("profile/config", req.user)
}

exports.configUserProcess = async (req, res) => {
  const { username } = req.body
  let user
  if(req.file){
    post = await User.findByIdAndUpdate(req.user.id, {
      profilePhoto: req.file.path,
      username,
      password
    })
  } else {
    post = await User.findByIdAndUpdate(req.user.id, {
      username,
      password
    })
  }
  res.redirect("/profile")
}