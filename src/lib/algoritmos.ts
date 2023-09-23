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
