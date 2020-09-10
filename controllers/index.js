const User = require("../models/User")

exports.rootView = (req, res) => {
  res.render("index")
}

exports.routesView = async (req, res) =>{
  const user = await User.findById(req.user)
  res.render('map', { user } )
}

exports.dataView = async (req, res) => {
  const user = await User.findById(req.user)
  res.render("data", { user } )
}

exports.inicioView = async (req, res) => {
  const user = await User.findById(req.user)
  res.render("inicio", { user })
}