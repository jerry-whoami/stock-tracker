/** Types generated for queries found in "src/models/products.ts" */

/** 'GetAll' parameters type */
export type IGetAllParams = void;

/** 'GetAll' return type */
export interface IGetAllResult {
  code: string;
  cost: number | null;
  description: string | null;
  id: number;
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

/** 'Create' parameters type */
export interface ICreateParams {
  code?: string | null | void;
  cost?: number | null | void;
  description?: string | null | void;
  price?: number | null | void;
  quantity?: number | null | void;
  sold?: number | null | void;
  title?: string | null | void;
}

/** 'Create' return type */
export type ICreateResult = void;

/** 'Create' query type */
export interface ICreateQuery {
  params: ICreateParams;
  result: ICreateResult;
}

/** 'Update' parameters type */
export interface IUpdateParams {
  code?: string | null | void;
  cost?: number | null | void;
  description?: string | null | void;
  price?: number | null | void;
  quantity?: number | null | void;
  sold?: number | null | void;
  title?: string | null | void;
}

/** 'Update' return type */
export type IUpdateResult = void;

/** 'Update' query type */
export interface IUpdateQuery {
  params: IUpdateParams;
  result: IUpdateResult;
}

/** 'Destroy' parameters type */
export interface IDestroyParams {
  code?: string | null | void;
}

/** 'Destroy' return type */
export type IDestroyResult = void;

/** 'Destroy' query type */
export interface IDestroyQuery {
  params: IDestroyParams;
  result: IDestroyResult;
}

