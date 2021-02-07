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
        let quote = req.body.items.length * fee.amount;
        res.json('$' + quote.toFixed(2));
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
      // customerQuote(req.body.items, all[1], all[0])
      //   .then(quote => res.json(quote))
      //   .catch((err) => res.json({
      //     error: err.message
      //   }));
      const originalQuote = req.body.items.length * all[1].amount;
      let updatedQuote = originalQuote

      const perUnitOfVolume = parseInt(all[0].per_unit_of_volume, 10);
      const percentValueCharge = parseInt(all[0].percent_of_value_charge, 10);
      const discount = parseInt(all[0].discount, 10);
      const firstHundredDiscount = parseInt(all[0].first_hundred_discount, 10);
      const secondHundredDiscount = parseInt(all[0].second_hundred_discount, 10);
      const discountPastTwoHundred = parseInt(all[0].discount_after, 10);

      if (perUnitOfVolume) {
        let volume = 0;

        req.body.items.forEach(element => {
          let length = parseInt(element.length, 10);
          let width = parseInt(element.width, 10);
          let height = parseInt(element.height, 10);
          let itemsVolume = length * width * height
          volume += itemsVolume;
        });
        console.log(updatedQuote);
        updatedQuote += perUnitOfVolume * volume;
        console.log(volume);
      };

      if (percentValueCharge) {
        let itemValue = 0;

        req.body.items.forEach(element => {
          let value = parseInt(element.value, 10);
          itemValue += value;
        });

        updatedQuote += itemValue * (percentValueCharge / 100); 
      };

      if (firstHundredDiscount) {
        updatedQuote -= (firstHundredDiscount / 100) * updatedQuote
      }

      // problem here though, what if % of value charge? 
      if (secondHundredDiscount && req.body.items.length > 100) {
        let quotePastHundred = 0

        for (let i = 101; i < req.body.items.length; i++) {
          
          if (perUnitOfVolume) {
            let length = parseInt(element.length, 10);
            let width = parseInt(element.width, 10);
            let height = parseInt(element.height, 10);
            quotePastHundred += (length * width * height) * all[0].per_unit_of_volume
          };

          quotePastHundred += all[1].amount;
        }

        updatedQuote -= quotePastHundred;
        updatedQuote += quotePastHundred * (secondHundredDiscount / 100);
      }

      if (discountPastTwoHundred && req.body.items.length > 200) {
        let quotePastTwohundred = 0

        for (let i = 201; i < req.body.items.length; i++) {

          if (perUnitOfVolume) {
            let length = parseInt(element.length, 10);
            let width = parseInt(element.width, 10);
            let height = parseInt(element.height, 10);
            quotePastTwoHundred += (length * width * height) * all[0].per_unit_of_volume
          };

          quotePastTwohundred += all[1].amount;
        }

        updatedQuote -= quotePastTwohundred;
        updatedQuote += quotePastTwohundred * (discountPastTwoHundred / 100);
      }

      if (discount) {
        updatedQuote -= (discount / 100) * updatedQuote;
      };
      res.json('$' + updatedQuote.toFixed(2));
    })
    .catch(err => res.json({
      error: err.message
    }));
    
  });

  return router;
};
