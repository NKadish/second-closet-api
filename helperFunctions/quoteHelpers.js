  const genericQuote = (items, flatFee) => {
      if (isNaN(flatFee.amount)) {
        return 'Please input a number as a flat fee!'
      };
      if (!Array.isArray(items)) {
        return 'Please input an object with an array of items!'
      };
      let quote = items.length * flatFee.amount;
      return '$' + quote.toFixed(2);
  };

  const customerQuote = (items, flatFee, customer) => {

    if (isNaN(flatFee.amount)) {
      return 'Please input a number as a flat fee!';
    };

    if (!Array.isArray(items)) {
      return 'Please input an object with an array of items!';
    };

    if (typeof customer !== 'object') {
      return 'Please input an object for the customer!';
    };

    const originalQuote = items.length * flatFee.amount;
      let updatedQuote = originalQuote

      const perUnitOfVolume = parseInt(customer.per_unit_of_volume, 10);
      const percentValueCharge = parseInt(customer.percent_of_value_charge, 10);
      const discount = parseInt(customer.discount, 10);
      const firstHundredDiscount = parseInt(customer.first_hundred_discount, 10);
      const secondHundredDiscount = parseInt(customer.second_hundred_discount, 10);
      const discountPastTwoHundred = parseInt(customer.discount_after, 10);

      if (perUnitOfVolume) {
        let volume = 0;

        items.forEach(element => {
          let length = parseInt(element.length, 10);
          let width = parseInt(element.width, 10);
          let height = parseInt(element.height, 10);
          let itemsVolume = length * width * height
          volume += itemsVolume;
        });

        updatedQuote += perUnitOfVolume * volume;

      };

      if (percentValueCharge) {
        let itemValue = 0;

        items.forEach(element => {
          let value = parseInt(element.value, 10);
          itemValue += value;
        });

        updatedQuote += itemValue * (percentValueCharge / 100); 
      };

      if (firstHundredDiscount) {
        updatedQuote -= (firstHundredDiscount / 100) * updatedQuote
      }

      if (secondHundredDiscount && items.length > 100) {
        let quotePastHundred = 0

        for (let i = 101; i < items.length; i++) {
          
          if (perUnitOfVolume) {
            let length = parseInt(element.length, 10);
            let width = parseInt(element.width, 10);
            let height = parseInt(element.height, 10);
            quotePastHundred += (length * width * height) * customer.per_unit_of_volume
          };

          quotePastHundred += flatFee.amount;
        }

        updatedQuote -= quotePastHundred;
        updatedQuote += quotePastHundred * (secondHundredDiscount / 100);
      }

      if (discountPastTwoHundred && items.length > 200) {
        let quotePastTwohundred = 0

        for (let i = 201; i < items.length; i++) {

          if (perUnitOfVolume) {
            let length = parseInt(element.length, 10);
            let width = parseInt(element.width, 10);
            let height = parseInt(element.height, 10);
            quotePastTwoHundred += (length * width * height) * customer.per_unit_of_volume
          };

          quotePastTwohundred += flatFee.amount;
        }

        updatedQuote -= quotePastTwohundred;
        updatedQuote += quotePastTwohundred * (discountPastTwoHundred / 100);
      }

      if (discount) {
        updatedQuote -= (discount / 100) * updatedQuote;
      };
      return '$' + updatedQuote.toFixed(2);

  };


module.exports = {
    genericQuote,
    customerQuote
};