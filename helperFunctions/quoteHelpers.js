const genericQuote = (items, flatFee) => {
  if (isNaN(flatFee.amount)) {
    return 'Please input a number as a flat fee!';
  }
  if (!Array.isArray(items)) {
    return 'Please input an object with an array of items!';
  }
  let quote = items.length * flatFee.amount;
  return '$' + quote.toFixed(2);
};

const customerQuote = (items, flatFee, customer) => {
  validateParams(items, flatFee, customer);

  const originalQuote = items.length * flatFee.amount;
  let updatedQuote = originalQuote;

  const perUnitOfVolume = parseInt(customer.per_unit_of_volume, 10);
  const percentValueCharge = parseInt(customer.percent_of_value_charge, 10);

  updatedQuote += calculateVolumeCharge(items, perUnitOfVolume);
  updatedQuote += calculatePercentValueCharge(items, percentValueCharge);

  updatedQuote = applyDiscounts(customer, items, updatedQuote);

  return '$' + updatedQuote.toFixed(2);
};

/*
 * This won't work as is, but typically you want to throw exceptions in these cases with the proper status and message.
 * Thrown exceptions will be caught by your handlers, which can then propagate the error to the client.
 *
 * e.g. in your handler, when you catch an error:
 * .catch((err) =>
 *   res.status(err.status).json(err); // you can pass the err object directly into .json()
 * );
 */
const validateParams = (items, fee, customer) => {
  if (isNaN(flatFee.amount)) {
    const err = {
      status: 404,
      message: 'invalid or missing flat fee',
    };

    // ideally you would build up all the validation errors into one error payload if possible
    // so that the client knows every problem that requires fixing without having to submit repeatedly
    throw err;
  }

  if (!Array.isArray(items)) {
    return 'Please input an object with an array of items!';
  }

  if (typeof customer !== 'object') {
    return 'Please input an object for the customer!';
  }
};

const calculateVolumeCharge = (items, charge) => {
  if (charge) {
    let volume = 0;

    items.forEach((element) => {
      let length = parseInt(element.length, 10);
      let width = parseInt(element.width, 10);
      let height = parseInt(element.height, 10);
      let itemsVolume = length * width * height;
      volume += itemsVolume;
    });

    return charge * volume;
  }

  return 0;
};

const calculatePercentValueCharge = (items, charge) => {
  if (charge) {
    let itemValue = 0;

    items.forEach((element) => {
      let value = parseInt(element.value, 10);
      itemValue += value;
    });

    return itemValue * (charge / 100);
  }

  return 0;
};

const applyDiscounts = (customer, items, quote) => {
  const discount = parseInt(customer.discount, 10);
  const firstHundredDiscount = parseInt(customer.first_hundred_discount, 10);
  const secondHundredDiscount = parseInt(customer.second_hundred_discount, 10);
  const discountPastTwoHundred = parseInt(customer.discount_after, 10);

  if (firstHundredDiscount) {
    quote -= (firstHundredDiscount / 100) * quote;
  }

  if (secondHundredDiscount && items.length > 100) {
    let quotePastHundred = 0;

    for (let i = 101; i < items.length; i++) {
      if (perUnitOfVolume) {
        let length = parseInt(element.length, 10);
        let width = parseInt(element.width, 10);
        let height = parseInt(element.height, 10);
        quotePastHundred +=
          length * width * height * customer.per_unit_of_volume;
      }

      quotePastHundred += flatFee.amount;
    }

    quote -= quotePastHundred;
    quote += quotePastHundred * (secondHundredDiscount / 100);
  }

  if (discountPastTwoHundred && items.length > 200) {
    let quotePastTwohundred = 0;

    for (let i = 201; i < items.length; i++) {
      if (perUnitOfVolume) {
        let length = parseInt(element.length, 10);
        let width = parseInt(element.width, 10);
        let height = parseInt(element.height, 10);
        quotePastTwoHundred +=
          length * width * height * customer.per_unit_of_volume;
      }

      quotePastTwohundred += flatFee.amount;
    }

    quote -= quotePastTwohundred;
    quote += quotePastTwohundred * (discountPastTwoHundred / 100);
  }

  if (discount) {
    quote -= (discount / 100) * quote;
  }

  return quote;
};

module.exports = {
  genericQuote,
  customerQuote,
};
