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

  // error for this if the customer already exists
  router.post("/:customerName", (req, res) => {

    newCustomer(req.params.customerName)
      .then((customer) => res.json(customer))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/discount/:customerName", (req, res) => {

    updateDiscount(req.params.customerName, res.body)
      .then((discount) => res.json(discount))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/volumeCharge/:customerName", (req, res) => {

    updateVolumeCharge(req.params.customerName, res.body)
      .then((volumeCharge) => res.json(volumeCharge))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/valueCharge/:customerName", (req, res) => {

    updatePercentValueCharge(req.params.customerName, res.body)
      .then((valueCharge) => res.json(valueCharge))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/firstHundred/:customerName", (req, res) => {

    updateFirstHundredDiscount(req.params.customerName, res.body)
      .then((firstHundred) => res.json(firstHundred))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });
  
  router.post("/secondHundred/:customerName", (req, res) => {

    updateSecondHundredDiscount(req.params.customerName, res.body)
      .then((secondHundred) => res.json(secondHundred))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  router.post("/pastTwoHundred/:customerName", (req, res) => {

    updateDiscountAfter(req.params.customerName, res.body)
      .then((pastTwoHundred) => res.json(pastTwoHundred))
      .catch((err) => res.json({
        error: err.message
      }));
    
  });

  return router;
};

