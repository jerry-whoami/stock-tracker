/** Types generated for queries found in "src/models/products.ts" */

/** 'GetAll' parameters type */
export type IGetAllParams = void;

/** 'GetAll' return type */
export interface IGetAllResult {
  code: string;
  cost: number | null;
  description: string | null;
  price: number | null;
  quantity: number | null;
  sold: number | null;
  title: string;
}

/** 'GetAll' query type */
export interface IGetAllQuery {
  params: IGetAllParams;
  result: IGetAllResult;
}

