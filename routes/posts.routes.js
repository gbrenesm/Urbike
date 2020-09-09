const express = require('express')
const router  = express.Router()
const { enssureLogin } = require("../middleware")
const uploadFile = require("../config/cloudinary")

const { newPostView, 
        newPostProcess,
        postsAll, 
        postDetail,
        postRodadasView,
        postAyudaView,
        postCicloviaView,
        postRecomendacionView,
        postReparacionesView,
        postOtrosView} = require("../controllers/posts")

const { createComentary } = require("../controllers/comentary")

router.get("/newpost", enssureLogin("/login"), newPostView)
router.post("/newpost", enssureLogin("/login"), uploadFile.single("image"), newPostProcess)

router.get("/foro", postsAll)
router.get("/foro/:id", postDetail)

router.post("/foro/:id",  enssureLogin("/login"), createComentary)


///////////Categorías////////////////
router.get("/ayuda", postAyudaView)
router.get("/rodadas", postRodadasView)
router.get("/ciclovia", postCicloviaView)
router.get("/recomendacion", postRecomendacionView)
router.get("/reparaciones", postReparacionesView)
router.get("/otros", postOtrosView)


module.exports = router