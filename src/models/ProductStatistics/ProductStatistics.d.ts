export const noArrayError = new Error('A terméklista megadása kötelező');
export const emptyArrayError = new Error('Üres terméklista');
export const noProductWithCategoryError = new Error(
	'A megadott kategóriával nem található termék'
);

export type Product = {
	name: string;
	category: string;
	price: number;
};

export default interface IProductStatistics {
	products: Product[];
	getAveragePrice(): number;
	getMostExpensiveProduct(): Product;
	getCheapestProduct(): Product;
	getAveragePriceByCategory(category: string): number;
	getAveragePriceGroupByCategory(): { [key: Product[category]]: number };
}
