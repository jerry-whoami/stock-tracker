import { sql } from '@pgtyped/runtime';
import type { IGetAllQuery } from './products.types';

export const getAll = sql<IGetAllQuery>`
  SELECT * FROM products;
`;
