import { sql } from '@pgtyped/runtime';
import type { IGetAllQuery, ICreateQuery, IUpdateQuery, IDestroyQuery } from './products.types';

export const getAll = sql<IGetAllQuery>`
  SELECT * FROM products ORDER BY id;
`;

export const create = sql<ICreateQuery>`
  INSERT INTO 
    products (code, title, description, price, cost, quantity, sold)
  VALUES 
    ($code, $title, $description, $price, $cost, $quantity, $sold)
`;

export const update = sql<IUpdateQuery>`
  UPDATE products
  SET title = $title,
      description = $description,
      price = $price,
      cost = $cost,
      quantity = $quantity,
      sold = $sold
  WHERE code = $code; 
`;

export const destroy = sql<IDestroyQuery>`
  DELETE FROM products
  WHERE code = $code;
`;
