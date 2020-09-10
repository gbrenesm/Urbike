const express = require('express');
const router  = express.Router();
const User = require("../models/User")

const { routesView
} = require("../controllers/index")


router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/routes', routesView)

router.get('/data', async (req, res, next) => {
  const user = await User.findById(req.user)
  res.render('data', { user })
})

router.get("/inicio", async (req, res, next) => {
  const user = await User.findById(req.user)
  res.render("inicio", { user })
})

module.exports = router;
