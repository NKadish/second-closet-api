var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/flatfee', function(req, res, next) {
  res.render('flatFee', { title: 'Express' });
});

module.exports = router;