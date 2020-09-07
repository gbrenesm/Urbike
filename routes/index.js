const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.get('/sigup', (req, res, next) => {
  res.render('sigup')
})

router.get('/routes', (req, res, next) => {
  res.render('routes')
})

router.get('/data', (req, res, next) => {
  res.render('data')
})

router.get('/conctat', (req, res, next) => {
  res.render('conctat')
})
module.exports = router;
