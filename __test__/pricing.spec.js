const supertest = require('supertest');
const app = require('../app');

const item = {
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
  }

describe("Testing the pricing API", () => {

  it("tests the post general fees endpoint and returns something truthy", async () => {

		const response = await (await supertest(app).get('/pricing').send(item));

		expect(response.status).toBe(200);
		expect(response.body).toBe('$40.00');

  });
  
  it("tests the post new flat fee endpoint and returns something truthy", async () => {

		const response = await (await supertest(app).get('/pricing/A').send(item));

		expect(response.status).toBe(200);
		expect(response.body).toBe('$36.00');

  });

  
});