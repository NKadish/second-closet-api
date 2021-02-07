const express = require('express');
const router = express.Router();
const {genericQuote, customerQuote} = require('../helperFunctions/quoteHelpers');
// In pricing we can get a quote for a generic customer and a specific customer
// For future reference: 
// {
//   "items": [
//       {
//           "name": "Fridge",
//           "length": "3",
//           "height": "6",
//           "width": "4",
//           "weight": "300",
//           "value": "1000"
//       },
//       {
//           "name": "sofa",
//           "length": "6",
//           "height": "4",
//           "width": "3",
//           "weight": "100",
//           "value": "500"
//       }
//   ]
// }
module.exports = ({
  getCustomerByName,
  getFlatFee

}) => {
  
  router.get("/", (req, res) => {
    getFlatFee()
      .then((fee) => {
        console.log(fee.amount);
        console.log(req.body);
        res.json(genericQuote(req.body.items, fee.amount));
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
      res.json(customerQuote(req.body.items, all[1], all[0]));
    })
    .catch(err => res.json({
      error: err.message
    }));
    
  });

  return router;
};
