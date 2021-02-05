INSERT INTO
customers(name, discount, per_unit_of_volume, percent_of_value_charge, first_hundred_discount, second_hundred_discount, discount_after)
VALUES
  ('A', 10, null, null, null, null, null),
  ('B', null, 1, null, null, null, null),
  ('C', null, null, 5, null, null, null),
  ('D', null, 2, null, 5, 10, 15)