DROP TABLE IF EXISTS customers CASCADE;
CREATE TABLE customers (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    discount INTEGER,
    per_unit_of_volume INTEGER,
    percent_of_value_charge INTEGER,
    first_hundred_discount INTEGER,
    second_hundred_discount INTEGER,
    discount_after INTEGER
);