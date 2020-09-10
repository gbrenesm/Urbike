const express = require("express")
const router = express.Router()
const { enssureLogin } = require("../middleware")

const {
  profileView, configUserView, configUserProcess
} = require("../controllers/profile")

const { userPostsView,
        deletePost } = require("../controllers/posts")

router.get("/", enssureLogin("/login"), profileView)

router.get("/misposts", enssureLogin("/login"), userPostsView)

router.get("/:id", enssureLogin("/login"), deletePost)

router.get("/config", enssureLogin("/login"), configUserView)
router.post("/config", enssureLogin("/login"), configUserProcess)

module.exports = router