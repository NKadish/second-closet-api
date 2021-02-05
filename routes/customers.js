var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/customers', function(req, res, next) {
  res.render('customers', { title: 'Express' });
});

module.exports = router;