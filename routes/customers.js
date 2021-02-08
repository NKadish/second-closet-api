var express = require('express');
var router = express.Router();

// In customers we deal with creating the rules, new customers, getting both all and specific customers, and updating rules.
module.exports = ({
  getCustomers,
  getCustomerByName,
  newCustomer,
  updateDiscount,
  updateVolumeCharge,
  updatePercentValueCharge,
  updateFirstHundredDiscount,
  updateSecondHundredDiscount,
  updateDiscountAfter

}) => {
  
  router.get("/", (req, res) => {

    getCustomers()
      .then((customers) => res.json(customers))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.get("/:customerName", (req, res) => {

    getCustomerByName(req.params.customerName)
      .then((customer) => res.json(customer))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/:customerName", (req, res) => {

    getCustomerByName(req.params.customerName)
    .then((customer) => {
      if (customer) {
        res.status(401).json({error: 'Sorry, a customer with this name already exists'});
      } else {
        newCustomer(req.params.customerName)
        .then((newCustomer) => res.json(newCustomer))
        .catch((err) => res.json({
          error: err.message
        }));
      }
    }).catch(err => res.json({
      error: err.message
    }));
    
  });

  router.post("/discount/:customerName", (req, res) => {
    // Takes an object that looks like {"discount": "x"}
    updateDiscount(req.params.customerName, req.body.discount)
      .then((discount) => res.json(discount))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/volumeCharge/:customerName", (req, res) => {
    // Takes an object that looks like {"volumeCharge": "x"}
    updateVolumeCharge(req.params.customerName, req.body.volumeCharge)
      .then((volumeCharge) => res.json(volumeCharge))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/valueCharge/:customerName", (req, res) => {
    // Takes an object that looks like {"valueCharge": "x"}
    updatePercentValueCharge(req.params.customerName, req.body.valueCharge)
      .then((valueCharge) => res.json(valueCharge))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/firstHundred/:customerName", (req, res) => {
    // Takes an object that looks like {"firstHundred": "x"}
    updateFirstHundredDiscount(req.params.customerName, req.body.firstHundred)
      .then((firstHundred) => res.json(firstHundred))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });
  
  router.post("/secondHundred/:customerName", (req, res) => {
    // Takes an object that looks like {"secondHundred": "x"}
    updateSecondHundredDiscount(req.params.customerName, req.body.secondHundred)
      .then((secondHundred) => res.json(secondHundred))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/pastTwoHundred/:customerName", (req, res) => {
    // Takes an object that looks like {"pastTwoHundred": "x"}
    updateDiscountAfter(req.params.customerName, req.body.pastTwoHundred)
      .then((pastTwoHundred) => res.json(pastTwoHundred))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  return router;
};

