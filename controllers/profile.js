const User = require("../models/User")

exports.profileView = (req, res) => {
  res.render("profile/profile", req.user)
}

exports.configUserView = (req, res) => {
  console.log(req.user)
  res.render("profile/configuration")
}

exports.configUserProcess = async (req, res) => {
  const { username } = req.body
  let user
  if(req.file){
    user = await User.findByIdAndUpdate(req.user.id, {
      profilePhoto: req.file.path,
      username,
      password
    })
  } else {
    user = await User.findByIdAndUpdate(req.user.id, {
      username,
      password
    })
  }
  res.redirect("/profile")
}