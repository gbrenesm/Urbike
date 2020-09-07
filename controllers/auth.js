const User = require("../models/User")
const { hashSync, genSaltSync } = require("bcrypt")
const passport = require("../config/passport")


///////////////// Signup////////////////////////

exports.signupView = (req, res) => {
  res.render("auth/signup")
}

exports.signupProcess = async (req, res) => {
  const { username, email, password } = req.body
  if (username === "" || email === "" || password === "")
    return res.render("auth/signup", {error: "Por favor, completa todos los campos"})
  const existingUser = await User.findOne({ email })
  if (existingUser)
    return res.render("auth/signup", {error: "Email inválido"})
  const hashPswd = hashSync(password, genSaltSync(12))
  await User.create({
    username,
    email,
    password: hashPswd
  })
  res.redirect("/login")
}


///////////////// Login ////////////////////////

exports.loginView = (req, res) => {
  res.render("auth/login", { error: req.flash("error")})
}

exports.loginProcess = passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
})

///////////////// Google////////////////////////

exports.googleProcess = passport.authenticate("google", {
  scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
  ]
})

exports.googleRedirect = passport.authenticate("google", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
})

///////////////// Facebook ////////////////////////

exports.facebookProcess = passport.authenticate("facebook", {
  scope: ["email"]
})

exports.facebookRedirect = passport.authenticate("facebook", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
})