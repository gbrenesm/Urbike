const express = require("express")
const router = express.Router()
const { enssureLogin } = require("../middleware")

const {
  profileView
} = require("../controllers/profile")

const { userPostsView } = require("../controllers/posts")

router.get("/", enssureLogin("/login"), profileView)

router.get("/misposts", enssureLogin("/login"), userPostsView)

module.exports = router