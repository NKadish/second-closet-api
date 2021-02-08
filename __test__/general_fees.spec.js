const supertest = require('supertest');
const app = require('../app');

describe("Testing the general fees API", () => {

	it("tests the base route and returns true for status", async () => {

		const response = await supertest(app).get('/generalFees');

		expect(response.status).toBe(200);

  });
  
  it("tests the get general fees endpoint and returns something truthy", async () => {

		const response = await supertest(app).get('/generalFees');

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });

  it("tests the post general fees endpoint and returns something truthy", async () => {

		const response = await (await supertest(app).post('/generalFees').send({
      "volumeCharge":1
    }));

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });
  
  it("tests the get flat fee endpoint and returns something truthy", async () => {

		const response = await supertest(app).get('/generalFees/flatFee');

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });
  
  it("tests the post new flat fee endpoint and returns something truthy", async () => {

		const response = await (await supertest(app).post('/generalFees/flatFee').send({
      "amount":20
    }));

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });

  
});