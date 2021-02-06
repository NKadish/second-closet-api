var express = require('express');
var router = express.Router();

// In flat fee we can see the flat fee and update it 
module.exports = ({
  getFlatFee,
  updateFlatFee

}) => {
  
  router.get("/", (req, res) => {

    getFlatFee()
      .then((flatFee) => res.json(flatFee))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/", (req, res) => {

    updateFlatFee(res.body)
      .then((flatFee) => res.json(flatFee))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  return router;
};

