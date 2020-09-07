const express = require('express');
const router  = express.Router();

const {
  signupView,
  signupProcess,
  loginView,
  loginProcess,
  googleProcess,
  googleRedirect,
  facebookProcess,
  facebookRedirect,
  logout
} = require("../controllers/auth")


//////////////// Sign up /////////////////
router.get("/signup", signupView)
router.post("/signup", signupProcess)


//////////////// Login /////////////////
router.get("/login", loginView)
router.post("/login", loginProcess)


//////////////// Google /////////////////
router.get("/auth/google", googleProcess)
router.get("/auth/google/callback", googleRedirect)


//////////////// Facebook /////////////////
router.get("/auth/facebook", facebookProcess)
router.get("/auth/facebook/callback", facebookRedirect)


//////////////// Facebook /////////////////
router.get("/logout", logout)



module.exports = router

