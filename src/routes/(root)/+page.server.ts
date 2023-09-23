import type { PageServerLoad } from './$types';
import * as Product from '../../models/products';
import { pool } from '$lib/server/database';
import { paginate } from '$lib/algoritmos';
import type { Actions } from '@sveltejs/kit';
import type { ICreateParams, IDestroyParams, IUpdateParams } from '../../models/products.types';

export const load: PageServerLoad = async function ({ url }) {
	const page = Number(url.searchParams.get('currentPage')) || 1;
	const perPage = Number(url.searchParams.get('perPage')) || 10;
	let products = await Product.getAll.run(undefined, pool);

	return {
		products: paginate(products, page, perPage)
	};
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries()) as ICreateParams;

		await Product.create.run(
			{
				code: Math.floor(Math.random() * (10000 - 1000) + 1000).toString(),
				title: data.title,
				price: data.price || 0,
				cost: data.cost || 0,
				quantity: data.quantity || 0,
				description: data.description
			},
			pool
		);
	},

	update: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries()) as IUpdateParams;

		await Product.update.run(
			{
				code: data.code,
				title: data.title,
				description: data.description,
				price: data.price || 0,
				cost: data.cost || 0,
				quantity: data.quantity || 0,
				sold: data.sold || 0
			},
			pool
		);
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries()) as IDestroyParams;

		await Product.destroy.run({ code: data.code }, pool);
	}
};
