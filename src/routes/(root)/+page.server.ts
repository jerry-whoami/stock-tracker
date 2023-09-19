import { sortear } from '$lib/algoritmos';
import type { PageServerLoad } from './$types';

const rows = [
	{ code: 'SO-192', title: 'Sneaker', quantity: 12, price: 123.34, cost: 60 },
	{ code: 'SO-192', title: 'Sneaker', quantity: 12, price: 123.34, cost: 60 },
	{ code: 'SO-192', title: 'Sneaker', quantity: 12, price: 123.34, cost: 60 },
	{ code: 'SO-192', title: 'Sneaker', quantity: 12, price: 123.34, cost: 60 },
	{ code: 'SO-192', title: 'Sneaker', quantity: 12, price: 123.34, cost: 60 }
];

export const load: PageServerLoad = function ({}) {
	let products = sortear();

	return {
		products
	};
};
