import type { PageServerLoad } from './$types';
import * as Product from '../../models/products';
import { pool } from '$lib/server/database';
import { paginate } from '$lib/algoritmos';

export const load: PageServerLoad = async function ({ url }) {
	const page = Number(url.searchParams.get('currentPage')) || 1;
	const perPage = Number(url.searchParams.get('perPage')) || 10;
	let products = await Product.getAll.run(undefined, pool);

	return {
		products: paginate(products, page, perPage)
	};
};
