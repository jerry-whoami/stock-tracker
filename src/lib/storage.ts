import fs from 'fs/promises';

export default class Storage {
	private static root = 'static';

	public static async put(path: string, file: File) {
		const fileName = `${crypto.randomUUID()}.${this.getFileExtension(file)}`;
		path = this.parsePath(path) + fileName;

		await fs.writeFile(this.root + path, Buffer.from(await file.arrayBuffer()));

		return path;
	}

	private static getFileExtension(file: File) {
		return file.name.split('.').pop();
	}

	private static parsePath(path: string) {
		return (
			'/' +
			path
				.split('/')
				.filter((x) => x)
				.join('/') +
			'/'
		);
	}
}
