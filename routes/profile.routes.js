const express = require("express");
const router = express.Router();

const {
  profileView
} = require("../controllers/profile")

router.get("/", profileView)

module.exports = router