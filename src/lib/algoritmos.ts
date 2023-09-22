export function paginar<T>(registros: Array<T>, page = 1, perPage = 10): Array<T> {
	const start = page * perPage;
	return registros.slice(start, start + perPage);
}
