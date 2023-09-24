import type { PageServerLoad } from './$types';
import * as Product from '../../models/products';
import { pool } from '$lib/server/database';
import { paginate } from '$lib/algoritmos';
import type { Actions } from '@sveltejs/kit';
import type {
	ICreateParams,
	IDestroyParams,
	IGetAllResult,
	IUpdateParams
} from '../../models/products.types';

const registrosPrueba: IGetAllResult[] = [
	{
		id: 1,
		code: '19281',
		title: 'Producto 1',
		description: '',
		price: 123,
		cost: 68.12,
		quantity: 45,
		sold: 3
	},
	{
		id: 2,
		code: '19282',
		title: 'Producto 2',
		description: '',
		price: 13,
		cost: 62,
		quantity: 25,
		sold: 9
	},
	{
		id: 3,
		code: '19283',
		title: 'Producto 3',
		description: '',
		price: 120,
		cost: 61,
		quantity: 145,
		sold: 10
	},
	{
		id: 4,
		code: '19284',
		title: 'Producto 4',
		description: '',
		price: 50,
		cost: 48.12,
		quantity: 5,
		sold: 2
	},

];

export const load: PageServerLoad = async function ({ url }) {
	const page = Number(url.searchParams.get('currentPage')) || 1;
	const perPage = Number(url.searchParams.get('perPage')) || 10;
	// Quitar comentario para usar la base de datos
	// let products = await Product.getAll.run(undefined, pool);
	// const BusquedaPorValor = searchByValue(registrosPrueba);
	// const productosPorPrecioDescendente = sortByPriceDescending(registrosPrueba);
	// const productosPorPrecioAscendente = sortByPriceAscending(registrosPrueba);
	// const productosPorCantidadDescendente = sortByQuantifyDescending(registrosPrueba);
	// const productosPorCantidadAscendente = sortByQuantifyAscending(registrosPrueba);
	// const productosPorCostoDescendente = sortByCostDescending(registrosPrueba);
	// const productosPorCostoAscendente = sortByCostAscending(registrosPrueba);

	return {
		// Cambiar registrosPrueba a products para utilizar la base de datos
		products: paginate(registrosPrueba, page, perPage)
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
