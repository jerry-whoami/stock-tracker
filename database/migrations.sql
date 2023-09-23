DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  quantity INT DEFAULT 0,
  price FLOAT,
  cost FLOAT,
  sold INT DEFAULT 0,
  PRIMARY KEY(id)
);

COPY products (code, title, description, quantity, price, cost, sold)
FROM '/docker-entrypoint-initdb.d/products.csv'
DELIMITER ','
CSV HEADER;
