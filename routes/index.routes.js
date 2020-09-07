const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});


// router.get('/routes', (req, res, next) => {
//   res.render('routes')
// })

// router.get('/data', (req, res, next) => {
//   res.render('data')
// })

// router.get('/conctat', (req, res, next) => {
//   res.render('conctat')
// })
module.exports = router;
