CREATE TABLE products (
  code VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  quantity INT DEFAULT 0,
  price FLOAT,
  cost FLOAT,
  sold INT DEFAULT 0,
  PRIMARY KEY(code)
);

COPY products (code, title, description, quantity, price, cost, sold)
FROM '/docker-entrypoint-initdb.d/products.csv'
DELIMITER ','
CSV HEADER;
