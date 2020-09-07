const express = require('express')
const router  = express.Router()
const { enssureLogin } = require("../middleware")
const uploadFile = require("../config/cloudinary")

const { newPostView, newPostProcess } = require("../controllers/posts")

router.get("/newpost", enssureLogin("/login"), newPostView)
router.post("/newpost", enssureLogin("/login"), uploadFile.single("image"), newPostProcess)

module.exports = router