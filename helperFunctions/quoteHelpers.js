  const genericQuote = (items, flatFee) => {
      let quote = items.length * flatFee;
      return quote;
      
  };

  const customerQuote = (items, flatFee, customer) => {

    const originalQuote = items.length * flatFee;
    let updatedQuote = originalQuote

    if (customer.per_unit_of_volume) {
      let volume = 0;

      items.forEach(element => {
        let itemsVolume = element.length * element.width * element.height
        volume += itemsVolume;
      });
      
      updatedQuote += customer.per_unit_of_volume * volume;
    };

    if (customer.percent_of_value_charge) {
      let value = 0;

      items.forEach(element => {
        value += element.value;
      });

      updatedQuote += value * .05; 
    };

    if (customer.first_hundred_discount) {
      updatedQuote -= (customer.first_hundred_discount / 100) * updatedQuote
    }

    // problem here though, what if % of value charge? 
    if (customer.second_hundred_discount && items.length > 100) {
      let quotePastHundred = 0

      for (let i = 101; i < items.length; i++) {

        if (customer.per_unit_of_volume) {
          quotePastHundred += (element.length * element.width * element.height) * customer.per_unit_of_volume
        };

        quotePastHundred += flatFee;
      }

      updatedQuote -= quotePastHundred;
      updatedQuote += quotePastHundred * (customer.second_hundred_discount / 100);
    }

    if (customer.discount_after && items.length > 200) {
      let quotePastTwohundred = 0

      for (let i = 201; i < items.length; i++) {

        if (customer.per_unit_of_volume) {
          quotePastHundred += (element.length * element.width * element.height) * customer.per_unit_of_volume
        };

        quotePastTwohundred += flatFee;
      }

      updatedQuote -= quotePastTwohundred;
      updatedQuote += quotePastTwohundred * (customer.discount_after / 100);
    }

    if (customer.discount) {
      updatedQuote -= (customer.discount / 100) * updatedQuote;
    };

    // fix pricing so that it includes $ + .00
    return updatedQuote;

  };


module.exports = {
    genericQuote,
    customerQuote
};