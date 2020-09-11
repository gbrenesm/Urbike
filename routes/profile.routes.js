const express = require("express")
const router = express.Router()
const { enssureLogin } = require("../middleware")
const uploadFile = require("../config/cloudinary")


const {
  profileView,
  profileConfigName,
  profileConfigPhotoView,
  profileConfigPhoto
} = require("../controllers/profile")

const { userPostsView,
        deletePost } = require("../controllers/posts")

router.get("/", enssureLogin("/login"), profileView)
router.post("/", enssureLogin("/login"), uploadFile.single("image"), profileConfigName)

router.get("/misposts", enssureLogin("/login"), userPostsView)

router.get("/:id", enssureLogin("/login"), deletePost)



module.exports = router