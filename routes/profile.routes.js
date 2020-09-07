const express = require("express")
const router = express.Router()
const { enssureLogin } = require("../middleware")

const {
  profileView
} = require("../controllers/profile")

router.get("/", enssureLogin("/login"), profileView)

module.exports = router