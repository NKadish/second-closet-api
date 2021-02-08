## Setup

    npm install

## Create db

    > sudo service postgresql start
    > psql
    > CREATE DATABASE <DB_NAME>

## Created .env

    > touch .env

Paste & fill this:

    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=<...>
    DB_USER=<...>
    DB_PASS=<...>

## Migrations & Seeds / Rollback

    > npm run db:reset

## Launch server

    > npm start

# Routes

Use Postman to send JSON to the routes

## `/customers`

- GET
- `/:customerName` GET
- `/:customerName` POST
- `/discount/:customerName` POST({"discount": "x"})
- `/volumeCharge/:customerName` POST({"volumeCharge": "x"})
- `/valueCharge/:customerName` POST({"valueCharge": "x"})
- `/firstHundred/:customerName` POST({"firstHundred": "x"})
- `/secondHundred/:customerName` POST({"secondHundred": "x"})
- `/pastTwoHundred/:customerName` POST({"pastTwoHundred": "x"})

## `/generalFees`

- GET 
- POST({"newFee":x})
- `/flatFee` GET 
- `/flatFee` POST({"Amount":x})

## `/pricing`

- GET(items, flatFee)
- `/:customerName` GET(items, flatFee)

# Testing

## Mocha & Chai

Mocha & Chai are used to test the quote helper functions

To run: 

    > npm test

## Jest

Jest is used to test the endpoints 

To run: 

    > npm run jest 

Important! Remember to run db:reset after each Jest test! 
