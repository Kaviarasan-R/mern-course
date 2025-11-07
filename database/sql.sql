-- TABLES

CREATE TABLE person (
  person_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  age INT,
  city VARCHAR(50)

  UNIQUE (first_name, last_name, city)
);

CREATE TABLE car (
  car_id SERIAL PRIMARY KEY,
  brand VARCHAR(50),
  model VARCHAR(50),
  price DECIMAL(10,2),
  owner_id INT REFERENCES person(person_id) -- 1-M relationship (one person owns many cars)

  UNIQUE (brand, model)
);

CREATE TABLE person_car ( -- For many-to-many (e.g. co-owners)
  person_id INT REFERENCES person(person_id),
  car_id INT REFERENCES car(car_id),

  PRIMARY KEY (person_id, car_id)
); 

-- INSERT

INSERT INTO person (first_name, last_name, age, city) -- Insert 5 persons
VALUES
('Alice', 'Johnson', 28, 'New York'),
('Bob', 'Smith', 35, 'Los Angeles'),
('Charlie', 'Brown', 40, 'Chicago'),
('Diana', 'Miller', 22, 'Houston'),
('Ethan', 'Clark', 30, 'Phoenix');

INSERT INTO car (brand, model, price, owner_id) -- Insert 5 cars
VALUES
('Tesla', 'Model 3', 50000, 1),
('Toyota', 'Camry', 25000, 2),
('BMW', 'X5', 60000, 1),
('Honda', 'Civic', 20000, 3),
('Ford', 'Mustang', 55000, 4); 

INSERT INTO person_car (person_id, car_id) VALUES
(1, 2), (2, 3), (3, 1), (4, 5), (5, 4); -- Example Many-to-Many ownership

-- SELECT

SELECT * FROM person;
SELECT first_name, age FROM person;
SELECT * FROM person WHERE age > 25;
SELECT * FROM car WHERE price BETWEEN 20000 AND 60000;
SELECT * FROM person ORDER BY age DESC LIMIT 3;
SELECT * FROM person ORDER BY first_name ASC OFFSET 2 LIMIT 2;
SELECT COUNT(*) AS total_people FROM person;
SELECT AVG(age) AS avg_age FROM person;
SELECT MAX(price) AS most_expensive_car FROM car;
SELECT DISTINCT city FROM person;
SELECT city, COUNT(*) AS total_people FROM person GROUP BY city HAVING COUNT(*) > 1;
SELECT CONCAT(first_name, ' ', last_name) AS full_name, age FROM person;

-- UPDATE

UPDATE person
SET city = 'San Francisco'
WHERE person_id = 2;

UPDATE car
SET price = price * 1.1
WHERE brand = 'Toyota';

-- ALTER

ALTER TABLE person ADD COLUMN email VARCHAR(100);
ALTER TABLE person DROP COLUMN age;
ALTER TABLE person RENAME COLUMN city TO hometown;
ALTER TABLE car ALTER COLUMN price TYPE INTEGER USING price::INTEGER;
ALTER TABLE car ADD CONSTRAINT car_price_min CHECK (price >= 1000);
ALTER TABLE car ALTER COLUMN owner_id SET NOT NULL;

-- ENUMS

CREATE TYPE car_condition AS ENUM ('new', 'used', 'refurbished');
ALTER TABLE car ADD COLUMN condition car_condition DEFAULT 'new';
ALTER TYPE car_condition ADD VALUE 'antique';

-- DELETE

DELETE FROM car WHERE car_id = 5;
DELETE FROM person WHERE age < 25;

-- JOINS

SELECT p.first_name, c.brand, c.model
FROM person p
INNER JOIN car c ON p.person_id = c.owner_id; -- Inner Join

SELECT p.first_name, c.brand
FROM person p
LEFT JOIN car c ON p.person_id = c.owner_id; -- Left Join

SELECT p.first_name, c.brand
FROM person p
RIGHT JOIN car c ON p.person_id = c.owner_id; -- Right Join

SELECT p.first_name, c.brand
FROM person p
FULL OUTER JOIN car c ON p.person_id = c.owner_id; -- Outer Join

SELECT p.first_name, c.brand, c.model
FROM person p
JOIN person_car pc ON p.person_id = pc.person_id
JOIN car c ON c.car_id = pc.car_id; -- Join

-- SUBQUERIES

SELECT *
FROM person
WHERE age > (SELECT AVG(age) FROM person); -- Scalar Subquery

SELECT first_name
FROM person
WHERE person_id IN (
  SELECT owner_id FROM car WHERE brand = 'Tesla'
); -- In Subquery

SELECT p.first_name
FROM person p
WHERE EXISTS (
  SELECT 1 FROM car c WHERE c.owner_id = p.person_id AND c.price > 40000
); -- Exist Subquery

-- INDEXING

CREATE VIEW person_with_cars AS
SELECT p.first_name, c.brand, c.model, c.price
FROM person p
LEFT JOIN car c ON p.person_id = c.owner_id;

CREATE INDEX idx_person_city ON person(city);

CREATE INDEX idx_new_cars_only
ON car(brand, model)
WHERE condition = 'new'; -- SELECT * FROM car WHERE condition = 'new';

-- TRANSACTIONS [TODO]

BEGIN;
INSERT INTO person (first_name, age, city) VALUES ('Zara', 27, 'Boston');
UPDATE car SET price = price * 0.9 WHERE brand = 'Honda';
COMMIT; -- or ROLLBACK

-- CTE (Functions) [TODO]

WITH avg_price AS (
  SELECT AVG(price) AS avg_price FROM car
)
SELECT * FROM car WHERE price > (SELECT avg_price FROM avg_price);

-- TRIGGERS [TODO]

