const express = require('express')
const router  = express.Router()
const { enssureLogin } = require("../middleware")
const uploadFile = require("../config/cloudinary")

const { newPostView, 
        newPostProcess,
        postsAll, 
        postDetail,
        postAyuda} = require("../controllers/posts")

const { createComentary } = require("../controllers/comentary")

router.get("/newpost", enssureLogin("/login"), newPostView)
router.post("/newpost", enssureLogin("/login"), uploadFile.single("image"), newPostProcess)

router.get("/foro", postsAll)
router.get("/foro/:id", postDetail)

router.post("/foro/:id",  enssureLogin("/login"), createComentary)

router.get("/ayuda", postAyuda)


module.exports = router