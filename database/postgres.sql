/*
| Command        | Meaning                   |
| -------------- | ------------------------- |
| \! clear       | Clear screen              |
| \l             | List databases            |
| \c <database>  | Connect to a database     |
| \du            | Display users and roles   |
| \dt            | Display tables            |
| \d             | Describe objects          |
| \d <tablename> | Describe a specific table |
| \di            | List indexes              |
| \o <filename>  | Output results to file    |
| \dv            | List views                |
| \df            | List functions            |
| \q             | Quit psql                 |
*/

/*
| Category     | Example Operators                          |
| ------------ | ------------------------------------------ |
| Arithmetic   | `+`, `-`, `*`, `/`, `%`                    |
| Comparison   | `=`, `!=`, `<`, `>`, `<=`, `>=`, `BETWEEN` |
| Logical      | `AND`, `OR`, `NOT`                         |
| Membership   | `IN`, `NOT IN`, `ANY`, `ALL`               |
| Existence    | `EXISTS`, `NOT EXISTS`                     |
| Pattern      | `LIKE`, `ILIKE`, `~`, `SIMILAR TO`         |
| Null/Boolean | `IS NULL`, `IS NOT NULL`, `IS TRUE`        |
| Set          | `UNION`, `INTERSECT`, `EXCEPT`             |
| Array        | `@>`, `<@`, `&&`, `= ANY`                  |
| JSON         | `->`, `->>`, `@>`                          |
*/

/*
| Join Type       | Simple Explanation                                                                      |
| --------------- | --------------------------------------------------------------------------------------- |
| INNER JOIN      | Returns only matching rows from both tables.                                            |
| LEFT JOIN       | Returns all rows from the left table and matching ones from the right.                  |
| RIGHT JOIN      | Returns all rows from the right table and matching ones from the left.                  |
| FULL OUTER JOIN | Returns all rows from both tables, matching where possible, filling missing with NULLs. |
| JOIN (default)  | Same as INNER JOIN — only matching rows from both tables.                               |
*/

-- DATABASE

CREATE DATABASE vehicle OWNER root;

-- USERS AND ROLES

CREATE ROLE user1 WITH LOGIN PASSWORD 'root' SUPERUSER CREATEDB CREATEROLE;
CREATE USER user2 WITH PASSWORD 'root'; -- Similar to CREATE ROLE user2 WITH LOGIN PASSWORD 'root';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO user2;

-- TABLES

CREATE TABLE person (
  person_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  age INT,
  city VARCHAR(50),
  UNIQUE (first_name, last_name, city) -- Unique pairs
);

CREATE TABLE car (
  car_id SERIAL PRIMARY KEY,
  brand VARCHAR(50),
  model VARCHAR(50),
  price DECIMAL(10,2),
  owner_id INT REFERENCES person(person_id), -- 1-M relationship (one person owns many cars)
  UNIQUE (brand, model)
);

CREATE TABLE person_car ( -- For many-to-many (it can be replaced by 1-M)
  person_id INT REFERENCES person(person_id),
  car_id INT REFERENCES car(car_id),
  PRIMARY KEY (person_id, car_id)
); 

CREATE TABLE rc_card (
  rc_id SERIAL PRIMARY KEY,
  rc_number VARCHAR(20) UNIQUE NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiry_date DATE NOT NULL,
  car_id INT UNIQUE NOT NULL REFERENCES car(car_id) ON DELETE CASCADE
);

CREATE TABLE rc_audit (
  id SERIAL PRIMARY KEY,
  rc_id INT,
  action TEXT,
  event_timing TEXT,   -- ‘BEFORE’, ‘AFTER’, etc.
  logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

INSERT INTO rc_card (rc_number, expiry_date, car_id)
VALUES ('RC-TESLA-001', '2030-12-31', 1);

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
SELECT city, COUNT(*) AS total_people FROM person GROUP BY city HAVING COUNT(*) >= 1;
SELECT CONCAT(first_name, ' ', last_name) AS full_name, age FROM person;
SELECT * FROM person WHERE first_name ILIKE 'a%'; 
SELECT * FROM person WHERE first_name ~* '^a'; -- Find names starting with “A” or “a” using regex

-- ARRAY & JSON Examples

CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  name TEXT,
  subjects TEXT[],
  data JSONB
);

INSERT INTO student (name, subjects, data)
VALUES
  ('Alice', ARRAY['Math', 'English', 'History'], '{"student": {"name": "Alice", "city": "Delhi"}, "items": ["Book", "Pen"]}'),
  ('Bob', ARRAY['Physics', 'Chemistry'], '{"student": {"name": "Bob", "city": "Mumbai"}, "items": ["Pencil"]}'),
  ('Charlie', ARRAY['Math', 'Art'], '{"student": {"name": "Charlie", "city": "Delhi"}, "items": ["Book", "Laptop"]}'),
  ('Diana', ARRAY['Biology', 'Chemistry'], null);

SELECT name FROM student WHERE subjects @> ARRAY['Math', 'English']; -- Find students who study both Math and English
SELECT name FROM student WHERE ARRAY['Math'] <@ subjects; -- Inverse operator
SELECT name FROM student WHERE subjects && ARRAY['Math', 'Biology']; -- Find anyone studying either Math or Biology
SELECT name FROM student WHERE 'Chemistry' = ANY(subjects); -- Find students taking Chemistry

SELECT * FROM student WHERE data->'student'->>'city' = 'Delhi';
SELECT * FROM student WHERE data @> '{"items": ["Book"]}'; -- We can also use index to get value

-- UPDATE

UPDATE person SET city = 'San Francisco' WHERE person_id = 2;
UPDATE car SET price = price * 1.1 WHERE brand = 'Toyota';

-- ALTER

ALTER TABLE person ADD COLUMN email VARCHAR(100);
ALTER TABLE person RENAME COLUMN city TO hometown;
ALTER TABLE person DROP COLUMN age;

ALTER TABLE car ADD CONSTRAINT car_price_min CHECK (price >= 1000);
ALTER TABLE car ALTER COLUMN price TYPE INTEGER USING price::INTEGER;
ALTER TABLE car ALTER COLUMN owner_id SET NOT NULL;

ALTER DATABASE root OWNER TO kavi;

/* Add UNIQUE CONSTRAINT to make PERSON_CAR & RC_CAR table 1-1 MANDATORY */
/* (OPTION: 1) */
ALTER TABLE person_car ADD COLUMN rc_id INT REFERENCES rc_card(rc_id);
ALTER TABLE person_car ALTER COLUMN rc_id SET NOT NULL;
ALTER TABLE person_car ADD CONSTRAINT unique_rc_id UNIQUE (rc_id);
ALTER TABLE rc_card ADD CONSTRAINT unique_rc_person_car UNIQUE (rc_id);

/* (OPTION: 2) */
ALTER TABLE person_car ADD COLUMN rc_id INT;
ALTER TABLE person_car ADD CONSTRAINT person_car_rc_id_fkey FOREIGN KEY (rc_id) REFERENCES rc_card(rc_id) ON DELETE CASCADE;
ALTER TABLE person_car ALTER COLUMN rc_id SET NOT NULL;
ALTER TABLE rc_card ADD CONSTRAINT unique_rc_person_car UNIQUE (rc_id);

/* (OPTION: 3) */
ALTER TABLE person_car ADD COLUMN rc_id INT NOT NULL, ADD CONSTRAINT person_car_rc_id_fkey FOREIGN KEY (rc_id) REFERENCES rc_card(rc_id) ON DELETE CASCADE;
ALTER TABLE rc_card ADD CONSTRAINT unique_rc_person_car UNIQUE (rc_id);

-- ENUMS

CREATE TYPE car_condition AS ENUM ('new', 'used', 'refurbished');
ALTER TYPE car_condition ADD VALUE 'antique';

ALTER TABLE car ADD COLUMN condition car_condition DEFAULT 'new';

-- DELETE

DELETE FROM car WHERE car_id = 5;

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
FULL OUTER JOIN car c ON p.person_id = c.owner_id; -- Full Outer Join

SELECT p.first_name, c.brand, c.model
FROM person p
JOIN person_car pc ON p.person_id = pc.person_id
JOIN car c ON c.car_id = pc.car_id; -- Join

-- VIEW

/* READ VIEW */
CREATE VIEW person_with_cars AS
SELECT 
  p.first_name,
  c.brand,
  c.model,
  c.price
FROM person p
JOIN car c ON p.person_id = c.owner_id;

SELECT * FROM person_with_cars;

/* UPDATE VIEW */
CREATE VIEW person_names AS SELECT person_id, first_name FROM person;
UPDATE person_names SET first_name = 'Alicia' WHERE person_id = 1;

-- FUNCTIONS

/* SIMPLE FUNCTION */
CREATE FUNCTION get_total_cars() 
RETURNS INT AS $$
  SELECT COUNT(*) FROM car;
$$ LANGUAGE sql;

SELECT get_total_cars();

/* FUNCTION WITH PARAMETERS */
CREATE FUNCTION get_cars_by_owner(owner INT)
RETURNS TABLE(brand VARCHAR, model VARCHAR, price DECIMAL) AS $$
  SELECT brand, model, price FROM car WHERE owner_id = owner;
$$ LANGUAGE sql;

SELECT * FROM get_cars_by_owner(1);

/* CONTROL FLOW FUNCTION (only available in pl/psql) */
CREATE OR REPLACE FUNCTION car_price_category(price DECIMAL)
RETURNS TEXT AS $$
BEGIN
  IF price < 20000 THEN
    RETURN 'Budget';
  ELSIF price < 50000 THEN
    RETURN 'Mid-range';
  ELSE
    RETURN 'Luxury';
  END IF;
END;
$$ LANGUAGE plpgsql;

SELECT brand, price, car_price_category(price) FROM car;

-- CONTROL STRUCTURES

/* SWITCH CASE */
DO $$
DECLARE
  car_brand TEXT := 'Honda';
  discount NUMERIC;
BEGIN
  CASE car_brand
    WHEN 'Honda' THEN discount := 10;
    WHEN 'Toyota' THEN discount := 8;
    WHEN 'Tesla' THEN discount := 5;
    ELSE discount := 2;
  END CASE;

  RAISE NOTICE 'Discount for % is % percent', car_brand, discount;
END;
$$;

/* WHILE LOOP */
DO $$
DECLARE
  counter INT := 5;
BEGIN
  WHILE counter > 0 LOOP
    RAISE NOTICE 'Counter: %', counter;
    counter := counter - 1;
  END LOOP;

  RAISE NOTICE 'Blast off!';
END;
$$;

/* FOR LOOP (EXIT, CONTINUE available in loops) */
DO $$
DECLARE
  i INT;
BEGIN
  FOR i IN 1..5 LOOP
    RAISE NOTICE 'Iteration %', i;
  END LOOP;
END;
$$;

-- SUBQUERY

SELECT first_name
FROM person p
WHERE age > (SELECT AVG(age) FROM person)
  AND city IN (SELECT city FROM person WHERE person_id IN (SELECT owner_id FROM car))
  AND EXISTS (SELECT 1 FROM car c WHERE c.owner_id = p.person_id);

-- INDEXING

CREATE INDEX idx_person_city ON person(city); -- SELECT * FROM person WHERE city ILIKE 'c%'

CREATE INDEX idx_new_cars_only
ON car(brand, model)
WHERE condition = 'new'; -- SELECT * FROM car WHERE condition = 'new';

-- TRANSACTIONS

/* SIMPLE */
BEGIN;
INSERT INTO person (first_name, age, city) VALUES ('Zara', 27, 'Boston');
UPDATE car SET price = price * 0.9 WHERE brand = 'Honda';
COMMIT; -- or ROLLBACK

/* ADVANCED */
DO $$
DECLARE
  v_error BOOLEAN := FALSE;
BEGIN
  BEGIN
    INSERT INTO person (first_name, age, city) VALUES ('Zara', 27, 'Boston');
    UPDATE car SET price = price * 0.9 WHERE brand = 'Honda';
    
    PERFORM 1 / 0; -- Force an error for demo
  EXCEPTION
    WHEN OTHERS THEN
      v_error := TRUE;
      ROLLBACK;
      RAISE NOTICE 'Transaction failed, rolled back inner work.';
  END;

  IF NOT v_error THEN
    RAISE NOTICE 'Transaction succeeded.';
  END IF;
END;
$$;

-- COMMON TABLE EXPRESSION (We can also use CRUD operations)

/* SIMPLE CTE */
WITH avg_price AS (
  SELECT AVG(price) AS avg_price FROM car
) SELECT * FROM car WHERE price > (SELECT avg_price FROM avg_price);

/* CHAINED CTE */
WITH
  total_cars AS (
    SELECT owner_id, COUNT(*) AS num_cars
    FROM car
    GROUP BY owner_id
  ),
  rich_people AS (
    SELECT p.first_name, p.city, t.num_cars
    FROM person p
    JOIN total_cars t ON p.person_id = t.owner_id
    WHERE t.num_cars >= 2
  ) SELECT * FROM rich_people;

-- TRIGGERS

/* BEFORE TRIGGER */
CREATE OR REPLACE FUNCTION rc_before_insert_fn()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expiry_date <= NEW.issue_date THEN
    RAISE EXCEPTION 'expiry_date cannot be before or equal to issue_date';
  END IF;

  NEW.rc_number := UPPER(NEW.rc_number);

  INSERT INTO rc_audit (rc_id, action, event_timing)
  VALUES (NEW.rc_id, 'INSERT', 'BEFORE');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rc_before_insert
BEFORE INSERT ON rc_card
FOR EACH ROW
EXECUTE FUNCTION rc_before_insert_fn();

/* AFTER TRIGGER */
CREATE OR REPLACE FUNCTION rc_after_insert_fn()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO rc_audit (rc_id, action, event_timing)
  VALUES (NEW.rc_id, 'INSERT', 'AFTER');
  RETURN NULL;  -- AFTER triggers usually return NULL
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rc_after_insert
AFTER INSERT ON rc_card
FOR EACH ROW
EXECUTE FUNCTION rc_after_insert_fn();

-- DROP

DROP DATABASE vehicle;
DROP ROLE user2;
DROP VIEW person_names;
DROP FUNCTION get_cars_by_owner(INT);
DROP INDEX idx_new_cars_only;