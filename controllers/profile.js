const User = require("../models/User")

exports.profileView = async (req, res) => {
  const user = await User.findById(req.user)
  res.render("profile/profile", { user })
}

exports.profileConfig = async (req, res) => {
  const { username } = req.body
  console.log(username)
  let user
  if(req.file) {
    user = await User.findByIdAndUpdate(req.user.id, {
      profilePhoto: req.file.path,
      username
    }, {new: true, rawResult: true})
  } else {
    user = await User.findByIdAndUpdate(req.user.id, {
      username
    }, {new: true, rawResult: true })
  }
  res.redirect("/inicio")
  //res.redirect(req.get('referer'))
}