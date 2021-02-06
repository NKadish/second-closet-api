var express = require('express');
var router = express.Router();

// In pricing we can get a quote for a generic customer and a specific customer
module.exports = ({
  getCustomerByName,
  genericQuote,
  customerQuote,
  getFlatFee

}) => {
  
  router.get("/", (req, res) => {
    getFlatFee()
      .then((fee) => {
        genericQuote(res.body, fee)
          .then((quote) => res.json(quote))
          .catch((err) => res.json({
            error: err.message
          }));
      })
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  return router;
};

