var express = require('express');
var router = express.Router();

// In flat fee we can see the flat fee and update it 
module.exports = ({
  getFlatFee,
  updateFlatFee

}) => {
  
  router.get("/flatfee", (req, res) => {

    getFlatFee()
      .then((flatFee) => res.json(flatFee))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/flatfee", (req, res) => {
    console.log(req.body)
    updateFlatFee(req.body.amount)
      .then((flatFee) => res.json(flatFee))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  return router;
};

