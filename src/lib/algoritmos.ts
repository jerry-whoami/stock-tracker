import { db } from '$lib/database';

export interface Paginator<T> {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
  items: Array<T>;
}

export interface ProductRecord {
  code: string;
  title: string;
  description: string | null;
  quantity: number | null;
  price: number | null;
  sold: number | null;
  cost: number | null;
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

export function searchByValue(productos: ProductRecord[], valor: string): ProductRecord[] {
  const productosEncontrados = productos.filter((producto) => {
    return Object.values(producto).some((atributo) =>
      atributo?.toString().toLowerCase().includes(valor.toLowerCase())
    );
  });

  return productosEncontrados;
}

export function sort(
  records: ProductRecord[],
  column: string,
  sort: 'asc' | 'desc' = 'desc'
): ProductRecord[] {
  const sorted = sort === 'asc' ? sortAscending(records, column) : sortDescending(records, column);

  return sorted;
}

function sortAscending(records: ProductRecord[], column: string): ProductRecord[] {
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

function sortDescending(records: ProductRecord[], column: string): ProductRecord[] {
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

//filter by code
export function filterProductsByCode(
  products: ProductRecord[],
  code: number | string
): ProductRecord[] {
  let searchCode = code.toString();
  let filterProducts: ProductRecord[] = [];

  for (let i = 0; i < products.length; i++) {
    let productTemp = products[i];
    let productCode = productTemp.code.toString();

    if (searchCode.length > productCode.length) {
      continue;
    }

    for (let j = 0; j <= productCode.length - searchCode.length; j++) {
      let match = true;
      for (let k = 0; k < searchCode.length; k++) {
        if (searchCode[k] !== productCode[j + k]) {
          match = false;
          break;
        }
      }
      if (match) {
        filterProducts.push(productTemp);
        break;
      }
    }
  }

  return filterProducts;
}

//filter by availability in stock
export function filterProductsByAvailability(products: ProductRecord[]): ProductRecord[] {
  let productsInStock: ProductRecord[] = [];

  for (let i = 0; i < products.length; i++) {
    let productTemp = products[i];
    if (productTemp.quantity > 0) {
      productsInStock.push(productTemp);
    }
  }

  return productsInStock;
}

export function hash(valor: number): string {
  const A = 0.6180339887;

  const multiplicacion = valor * A;
  const parteDecimal = multiplicacion - Math.floor(multiplicacion);

  return Math.floor(101001 * parteDecimal).toString();
}

export function searchByHash(search: number): ProductRecord {
  const valorHash = hash(search);

  const result = db[valorHash];

  return result;
}
