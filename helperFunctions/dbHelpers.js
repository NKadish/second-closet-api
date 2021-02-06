// Database queries below 
module.exports = (db) => {

  const getCustomers = () => {
    const query = {
      text: 'SELECT * FROM customers',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getCustomerByName = (name) => {

    const query = {
      text: `SELECT * FROM customers WHERE name = $1` ,
      values: [name]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const newCustomer = (name) => {
    const query = {
      text: `INSERT INTO customers (name) VALUES ($1) RETURNING *` ,
      values: [name]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const getDiscount = (name) => {

    const query = {
      text: `SELECT discount FROM customers WHERE name = $1` ,
      values: [name]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const updateDiscount = (customerName, newDiscount) => {
    const query = {
      text: `UPDATE customers SET discount = $2 WHERE name = $1`,
      values: [customerName, newDiscount]
    };

    return db.query(query)
      .catch(err => err);
  };

  const getVolumeCharge = (name) => {

    const query = {
      text: `SELECT per_unit_of_volume FROM customers WHERE name = $1` ,
      values: [name]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const updateVolumeCharge = (customerName, newVolumeCharge) => {
    const query = {
      text: `UPDATE customers SET per_unit_of_volume = $2 WHERE name = $1`,
      values: [customerName, newVolumeCharge]
    };

    return db.query(query)
      .catch(err => err);
  };

  const getPercentValueCharge = (name) => {

    const query = {
      text: `SELECT percent_of_value_charge FROM customers WHERE name = $1` ,
      values: [name]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const updatePercentValueCharge = (customerName, newPercent) => {
    const query = {
      text: `UPDATE customers SET percent_of_value_charge = $2 WHERE name = $1`,
      values: [customerName, newPercent]
    };

    return db.query(query)
      .catch(err => err);
  };

  const getFirstHundredDiscount = (name) => {

    const query = {
      text: `SELECT first_hundred_discount FROM customers WHERE name = $1` ,
      values: [name]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const updateFirstHundredDiscount = (customerName, newHundred) => {
    const query = {
      text: `UPDATE customers SET first_hundred_discount = $2 WHERE name = $1`,
      values: [customerName, newHundred]
    };

    return db.query(query)
      .catch(err => err);
  };

  const getSecondHundredDiscount = (name) => {

    const query = {
      text: `SELECT second_hundred_discount FROM customers WHERE name = $1` ,
      values: [name]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const updateSecondHundredDiscount = (customerName, newSecondHundred) => {
    const query = {
      text: `UPDATE customers SET second_hundred_discount = $2 WHERE name = $1`,
      values: [customerName, newSecondHundred]
    };

    return db.query(query)
      .catch(err => err);
  };

  const getDiscountAfter = (name) => {

    const query = {
      text: `SELECT discount_after FROM customers WHERE name = $1` ,
      values: [name]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const updateDiscountAfter = (customerName, newDiscountAfter) => {
    const query = {
      text: `UPDATE customers SET discount_after = $2 WHERE name = $1`,
      values: [customerName, newDiscountAfter]
    };

    return db.query(query)
      .catch(err => err);
  };

  const getFlatFee = () => {

    const query = {
      text: `SELECT amount FROM general_fees WHERE name = flat_fee` ,
      values: [name]
    };

    return db
      .query(query)
      .then(result => result.rows[0].amount)
      .catch((err) => err);
  };

  const updateFlatFee = (newFlatFee) => {
    const query = {
      text: `UPDATE general_fees SET amount = $1 WHERE name = flat_fee`,
      values: [newFlatFee]
    };

    return db.query(query)
      .catch(err => err);
  };

  return {
    getCustomers,
    getCustomerByName,
    newCustomer,
    getDiscount,
    updateDiscount,
    getVolumeCharge,
    updateVolumeCharge,
    getPercentValueCharge,
    updatePercentValueCharge,
    getFirstHundredDiscount,
    updateFirstHundredDiscount,
    getSecondHundredDiscount,
    updateSecondHundredDiscount,
    getDiscountAfter,
    updateDiscountAfter,
    getFlatFee,
    updateFlatFee
  };

};