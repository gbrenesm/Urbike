const User = require("../models/User")

exports.routesView = async (req, res) =>{
  const user = await User.findById(req.user)
  console.log(user)
  res.render('map', { user } )
}