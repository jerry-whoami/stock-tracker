import type { PageServerLoad } from './$types';
import { hash, paginate, searchByHash, sort } from '$lib/algoritmos';
import type { Actions } from '@sveltejs/kit';
import type { ICreateParams, IDestroyParams, IUpdateParams } from '../../models/products.types';
import { db } from '$lib/database';

export const load: PageServerLoad = async function ({ url }) {
  const page = Number(url.searchParams.get('currentPage')) || 1;
  const perPage = Number(url.searchParams.get('perPage')) || 10;
  const sortField = url.searchParams.get('sortField') || 'id';
  const sortOrder = url.searchParams.get('sortOrder') as 'asc' | 'desc' | undefined;
  const search = url.searchParams.get('search') ?? '';

  let products = db;
  let sortedProducts = sort(Object.values(products), sortField, sortOrder);
  if (search) sortedProducts = [searchByHash(+search)].filter((value) => value);

  return {
    products: paginate(sortedProducts, page, perPage)
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries()) as ICreateParams;
    const code = Math.floor(Math.random() * (10000 - 1000) + 1000);
    const hashed = hash(code);

    db[hashed] = {
      code: code.toString(),
      title: data.title ?? '',
      price: data.price || 0,
      cost: data.cost || 0,
      sold: 0,
      quantity: data.quantity || 0,
      description: data.description ?? ''
    };
  },

  update: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries()) as IUpdateParams;

    const product = searchByHash(+(data.code ?? 0));

    product['title'] = data.title ?? '';
    product['price'] = data.price || 0;
    product['cost'] = data.cost || 0;
    product['sold'] = data.sold ?? 0;
    product['quantity'] = data.quantity || 0;
    product['description'] = data.description ?? '';
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries()) as IDestroyParams;

    const hashed = hash(+(data.code ?? 0));

    delete db[hashed];
  }
};
