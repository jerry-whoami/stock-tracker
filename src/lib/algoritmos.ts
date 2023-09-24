import type { IGetAllResult } from '../models/products.types';

export interface Paginator<T> {
	currentPage: number;
	perPage: number;
	lastPage: number;
	total: number;
	items: Array<T>;
}

export function paginate<T>(records: Array<T>, currentPage = 1, perPage = 10): Paginator<T> {
	const start = (currentPage - 1) * perPage;

	return {
		currentPage,
		perPage,
		total: records.length,
		lastPage: Math.ceil(records.length / perPage),
		items: records.slice(start, start + perPage)
	};
}
// Search for value ** No DATABASE**
export function SearchByValue(valor: string) {
	const productosEncontrados = registrosPrueba.filter((producto) => {
		//sin base de datos
		return Object.values(producto).some((atributo) =>
			atributo.toString().toLowerCase().includes(valor.toLowerCase())
		);
	});

	if (productosEncontrados.length > 0) {
		return productosEncontrados;
	} else {
		return null; // null = no find
	}
}

export function sort(
	records: IGetAllResult[],
	column: string,
	sort: 'asc' | 'desc' = 'desc'
): IGetAllResult[] {
	const sorted = sort === 'asc' ? sortAscending(records, column) : sortDescending(records, column);

	return sorted;
}

function sortAscending(records: IGetAllResult[], column: string): IGetAllResult[] {
	const sortedProducts = [...records];
	const n = sortedProducts.length;

	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			if (sortedProducts[j][column] > sortedProducts[j + 1][column]) {
				const temp = sortedProducts[j];
				sortedProducts[j] = sortedProducts[j + 1];
				sortedProducts[j + 1] = temp;
			}
		}
	}

	return sortedProducts;
}

function sortDescending(records: IGetAllResult[], column: string): IGetAllResult[] {
	const sortedProducts = [...records];
	const n = sortedProducts.length;

	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			if (sortedProducts[j][column] < sortedProducts[j + 1][column]) {
				const temp = sortedProducts[j];
				sortedProducts[j] = sortedProducts[j + 1];
				sortedProducts[j + 1] = temp;
			}
		}
	}

	return sortedProducts;
}
