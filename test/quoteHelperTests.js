const { assert } = require('chai');

const { genericQuote, customerQuote } = require('../helperFunctions/quoteHelpers');

const testItems = {
    "items": [
        {
            "name": "Fridge",
            "length": "3",
            "height": "6",
            "width": "4",
            "weight": "300",
            "value": "1000"
        },
        {
            "name": "sofa",
            "length": "6",
            "height": "4",
            "width": "3",
            "weight": "100",
            "value": "500"
        }
    ]
  };

const testFlatFee = {amount: 20};

const testCustomer = {
  "id": 1,
  "name": "A",
  "discount": 10,
  "per_unit_of_volume": null,
  "percent_of_value_charge": null,
  "first_hundred_discount": null,
  "second_hundred_discount": null,
  "discount_after": null
};

const testCustomer2 = {
  "id": 2,
  "name": "B",
  "discount": null,
  "per_unit_of_volume": 1,
  "percent_of_value_charge": null,
  "first_hundred_discount": null,
  "second_hundred_discount": null,
  "discount_after": null
}

const testCustomer3 = {
  "id": 3,
  "name": "C",
  "discount": null,
  "per_unit_of_volume": null,
  "percent_of_value_charge": 5,
  "first_hundred_discount": null,
  "second_hundred_discount": null,
  "discount_after": null
}

const testCustomer4 = {
  "id": 4,
  "name": "D",
  "discount": null,
  "per_unit_of_volume": 2,
  "percent_of_value_charge": null,
  "first_hundred_discount": 5,
  "second_hundred_discount": 10,
  "discount_after": 15
}

describe('genericQuote', function() {
  it('should return the correct quote given an object of items and a flat fee', function() {
    const quote = genericQuote(testItems.items, testFlatFee);
    const expectedOutput = '$40.00';
    assert.strictEqual(quote, expectedOutput); 
  });

  it('Should return a message if the flat fee is not a number ', function() {
    const quote = genericQuote(testItems.items, 'Noah');
    const expectedOutput = 'Please input a number as a flat fee!';
    assert.strictEqual(quote, expectedOutput);  
  });

  it('Should return a message if items is not an object with an array of items', function() {
    const quote = genericQuote('Noah', testFlatFee);
    const expectedOutput = 'Please input an object with an array of items!';
    assert.strictEqual(quote, expectedOutput);  
  });
});

describe('customerQuote', function() {
  it('should return the correct quote given an object of items, a customer and a flat fee', function() {
    const quote = customerQuote(testItems.items, testFlatFee, testCustomer);
    const expectedOutput = '$36.00';
    assert.strictEqual(quote, expectedOutput); 
  });

  it('should return the correct quote given an object of items, a customer and a flat fee', function() {
    const quote = customerQuote(testItems.items, testFlatFee, testCustomer2);
    const expectedOutput = '$184.00';
    assert.strictEqual(quote, expectedOutput); 
  });

  it('should return the correct quote given an object of items, a customer and a flat fee', function() {
    const quote = customerQuote(testItems.items, testFlatFee, testCustomer3);
    const expectedOutput = '$115.00';
    assert.strictEqual(quote, expectedOutput); 
  });

  it('should return the correct quote given an object of items, a customer and a flat fee', function() {
    const quote = customerQuote(testItems.items, testFlatFee, testCustomer4);
    const expectedOutput = '$311.60';
    assert.strictEqual(quote, expectedOutput); 
  });

  it('Should return a message if the flat fee is not a number ', function() {
    const quote = customerQuote(testItems.items, 'Noah', testCustomer);
    const expectedOutput = 'Please input a number as a flat fee!';
    assert.strictEqual(quote, expectedOutput);  
  });

  it('Should return a message if items is not an object with an array of items', function() {
    const quote = customerQuote('Noah', testFlatFee, testCustomer);
    const expectedOutput = 'Please input an object with an array of items!';
    assert.strictEqual(quote, expectedOutput);  
  });

  it('Should return a message if customers is not an object', function() {
    const quote = customerQuote(testItems.items, testFlatFee, 42);
    const expectedOutput = 'Please input an object for the customer!';
    assert.strictEqual(quote, expectedOutput);  
  });
});