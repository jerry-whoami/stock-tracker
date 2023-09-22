import type { PageServerLoad } from './$types';
import * as Product from '../../models/products';
import { pool } from '$lib/server/database';
import { paginar } from '$lib/algoritmos';

export const load: PageServerLoad = async function ({ url }) {
	const page = Number(url.searchParams.get('page')) || 0;
	const perPage = Number(url.searchParams.get('perPage')) || 10;
	const productos = await Product.getAll.run(undefined, pool);

	return {
		products: paginar(productos, page, perPage)
	};
};
