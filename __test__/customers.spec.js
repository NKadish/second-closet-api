const supertest = require('supertest');
const app = require('../app');

describe("Testing the customers API", () => {

	it("tests the base route and returns true for status", async () => {

		const response = await supertest(app).get('/customers');

		expect(response.status).toBe(200);

  });
  
  it("tests the get customers endpoint and returns something truthy", async () => {

		const response = await supertest(app).get('/customers');

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });
  
  it("tests the get specific customer endpoint and returns something truthy", async () => {

		const response = await supertest(app).get('/customers/A');

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });
  
  it("tests the post new customer endpoint and returns something truthy", async () => {

		const response = await supertest(app).post('/customers/E');

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });

  it("tests the post new customer endpoint with a customer that already exists", async () => {

		const response = await supertest(app).post('/customers/A');

		expect(response.status).toBe(401);

  });
  
  it("tests the post new customer discount endpoint and returns something truthy", async () => {

		const response = await (await supertest(app).post('/customers/discount/E').send({
      "discount":"20"
    }));

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

	});

  it("tests the post new customer volume charge endpoint and returns something truthy", async () => {

		const response = await (await supertest(app).post('/customers/volumeCharge/E').send({
      "volumeCharge":"20"
    }));

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });
  
  it("tests the post new customer value charge endpoint and returns something truthy", async () => {

		const response = await (await supertest(app).post('/customers/valueCharge/E').send({
      "valueCharge":"20"
    }));

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });
  
  it("tests the post new first hundred discount endpoint and returns something truthy", async () => {

		const response = await (await supertest(app).post('/customers/firstHundred/E').send({
      "firstHundred":"20"
    }));

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });
  
  it("tests the post new second hundred discount endpoint and returns something truthy", async () => {

		const response = await (await supertest(app).post('/customers/secondHundred/E').send({
      "secondHundred":"20"
    }));

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

  });
  
  it("tests the post new discount past two hundred endpoint and returns something truthy", async () => {

		const response = await (await supertest(app).post('/customers/pastTwoHundred/E').send({
      "pastTwoHundred":"20"
    }));

		expect(response.status).toBe(200);
		expect(response.body).toBeTruthy();

	});
});