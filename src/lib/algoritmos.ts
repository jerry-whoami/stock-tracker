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
	const productosEncontrados = registrosPrueba.filter((producto) => { //sin base de datos
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
  // Sorting by price
  export function sortByPriceDescending(data: any[]): any[] {
	const sortedProducts = [...data];
	const n = sortedProducts.length;
  
	for (let i = 0; i < n - 1; i++) {
	  for (let j = 0; j < n - i - 1; j++) {
		if (sortedProducts[j].price < sortedProducts[j + 1].price) {
		  const temp = sortedProducts[j];
		  sortedProducts[j] = sortedProducts[j + 1];
		  sortedProducts[j + 1] = temp;
		}
	  }
	}
  	return sortedProducts;
  }
 export function sortByPriceAscending(data: any[]): any[] {
	const sortedProducts = [...data];
	const n = sortedProducts.length;
  
	for (let i = 0; i < n - 1; i++) {
	  for (let j = 0; j < n - i - 1; j++) {
		if (sortedProducts[j].price > sortedProducts[j + 1].price) {
		  const temp = sortedProducts[j];
		  sortedProducts[j] = sortedProducts[j + 1];
		  sortedProducts[j + 1] = temp;
		}
	  }
	}  
	return sortedProducts;
  }
   // Sorting by cost
   export function sortByCostDescending(data: any[]): any[] {
	const sortedProducts = [...data];
	const n = sortedProducts.length;
  
	for (let i = 0; i < n - 1; i++) {
	  for (let j = 0; j < n - i - 1; j++) {
		if (sortedProducts[j].price < sortedProducts[j + 1].price) {
		  const temp = sortedProducts[j];
		  sortedProducts[j] = sortedProducts[j + 1];
		  sortedProducts[j + 1] = temp;
		}
	  }
	}
  	return sortedProducts;
  }
 export function sortByCostAscending(data: any[]): any[] {
	const sortedProducts = [...data];
	const n = sortedProducts.length;
  
	for (let i = 0; i < n - 1; i++) {
	  for (let j = 0; j < n - i - 1; j++) {
		if (sortedProducts[j].price > sortedProducts[j + 1].price) {
		  const temp = sortedProducts[j];
		  sortedProducts[j] = sortedProducts[j + 1];
		  sortedProducts[j + 1] = temp;
		}
	  }
	}  
	return sortedProducts;
  }
   // Sorting by Quantify
   export function sortByQuantifyDescending(data: any[]): any[] {
	const sortedProducts = [...data];
	const n = sortedProducts.length;
  
	for (let i = 0; i < n - 1; i++) {
	  for (let j = 0; j < n - i - 1; j++) {
		if (sortedProducts[j].price < sortedProducts[j + 1].price) {
		  const temp = sortedProducts[j];
		  sortedProducts[j] = sortedProducts[j + 1];
		  sortedProducts[j + 1] = temp;
		}
	  }
	}
  	return sortedProducts;
  }
 export function sortByQuantifyAscending(data: any[]): any[] {
	const sortedProducts = [...data];
	const n = sortedProducts.length;
  
	for (let i = 0; i < n - 1; i++) {
	  for (let j = 0; j < n - i - 1; j++) {
		if (sortedProducts[j].price > sortedProducts[j + 1].price) {
		  const temp = sortedProducts[j];
		  sortedProducts[j] = sortedProducts[j + 1];
		  sortedProducts[j + 1] = temp;
		}
	  }
	}  
	return sortedProducts;
  }
  //Sorting by Code
  export function sortByCodeAscending(data: any[]): any[] {
	const sortedProducts = [...data];
	const n = sortedProducts.length;
  
	for (let i = 0; i < n - 1; i++) {
	  for (let j = 0; j < n - i - 1; j++) {
		if (sortedProducts[j].code.localeCompare(sortedProducts[j + 1].code, undefined, { numeric: true }) > 0) {
		 		  const temp = sortedProducts[j];
		  sortedProducts[j] = sortedProducts[j + 1];
		  sortedProducts[j + 1] = temp;
		}
	  }
	}
  	return sortedProducts;
  }
  export function sortByCodeDescending(data: any[]): any[] {
	const sortedProducts = [...data];
	const n = sortedProducts.length;
  
	for (let i = 0; i < n - 1; i++) {
	  for (let j = 0; j < n - i - 1; j++) {
		if (sortedProducts[j].code.localeCompare(sortedProducts[j + 1].code, undefined, { numeric: true }) < 0) {
		  const temp = sortedProducts[j];
		  sortedProducts[j] = sortedProducts[j + 1];
		  sortedProducts[j + 1] = temp;
		}
	  }
	}  
	return sortedProducts;
  }

//filter by code
export function filterProductsByCode(products: IGetAllResult[], code: number | string): IGetAllResult[] {
    let searchCode = code.toString();
    let filterProducts: IGetAllResult[] = [];

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
export function filterProductsByAvailability(products: IGetAllResult[]): IGetAllResult[] {
    let productsInStock: IGetAllResult[] = [];
  
    for (let i = 0; i < products.length; i++) {
        let productTemp = products[i];
        if (productTemp.quantity > 0) {
            productsInStock.push(productTemp);
        }
    }
  
    return productsInStock;
}
  
  
  
  
  
