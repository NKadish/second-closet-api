const express = require('express');
const router = express.Router();
const { genericQuote, customerQuote } = require("../helperFunctions/quoteHelpers");

// In pricing we can get a quote for a generic customer and a specific customer
module.exports = ({
  getCustomerByName,
  getFlatFee
  
}) => {
  
  router.get("/", (req, res) => {
    getFlatFee()
      .then((fee) => {
        console.log(fee);
        genericQuote(res.body, fee.amount)
          .then((quote) => res.json(quote))
          .catch((err) => res.json({
            error: err.message
          }));
      })
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.get("/:customerName", (req, res) => {

    Promise.all([
      getCustomerByName(req.params.customerName),
      getFlatFee()
    ]).then((all) => {
      customerQuote(res.body, all[1], all[0])
        .then(quote => res.json(quote))
        .catch((err) => res.json({
          error: err.message
        }));
      })
    .catch(err => res.json({
      error: err.message
    }));
    
  });

  return router;
};

