const express = require('express');
const router  = express.Router();
const User = require("../models/User")

const { routesView,
        dataView,
        inicioView,
        rootView } = require("../controllers/index")


router.get('/', rootView);

router.get('/routes', routesView)

router.get('/data', dataView)

router.get("/inicio", inicioView)

module.exports = router;
