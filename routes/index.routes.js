const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/routes', (req, res, next) => {
  res.render('map')
})

router.get('/data', (req, res, next) => {
  res.render('data')
})


module.exports = router;
