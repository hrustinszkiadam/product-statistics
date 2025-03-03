import IProductStatistics, {
	Product,
	emptyArrayError,
	noArrayError,
	noProductWithCategoryError,
} from './ProductStatistics.d';

export default class ProductStatistics implements IProductStatistics {
	products: Product[];

	constructor(products: Product[]) {
		if (!products || products == null) throw noArrayError;

		for (const product of products) {
			if (
				!product.name ||
				!product.category ||
				!product.price ||
				Object.keys(product).length !== 3
			) {
				throw new Error(
					`Invalid product ${product.name} ${product.category} ${product.price}`
				);
			}
		}

		this.products = products;
	}

	getAveragePrice(): number {
		if (!this.products.length) throw emptyArrayError;

		const sum = this.products.reduce((acc, product) => acc + product.price, 0);
		return Number((sum / this.products.length).toFixed(2));
	}

	getMostExpensiveProduct(): Product {
		if (!this.products.length) throw emptyArrayError;

		return this.products.reduce((acc, product) =>
			acc.price > product.price ? acc : product
		);
	}

	getCheapestProduct(): Product {
		if (!this.products.length) throw emptyArrayError;

		return this.products.reduce((acc, product) =>
			acc.price < product.price ? acc : product
		);
	}

	getAveragePriceByCategory(category: string): number {
		if (!this.products.length) throw emptyArrayError;

		const categoryProducts = this.products.filter(
			(product) => product.category === category
		);

		if (!categoryProducts.length) throw noProductWithCategoryError;

		const sum = categoryProducts.reduce(
			(acc, product) => acc + product.price,
			0
		);
		return Number((sum / categoryProducts.length).toFixed(2));
	}

	getAveragePriceGroupByCategory(): { [key: string]: number } {
		if (!this.products.length) throw emptyArrayError;

		const categorySums = this.products.reduce(
			(acc: Record<string, { sum: number; count: number }>, product) => {
				if (!acc[product.category]) {
					acc[product.category] = { sum: 0, count: 0 };
				}
				acc[product.category].sum += product.price;
				acc[product.category].count++;
				return acc;
			},
			{}
		);

		const groupProducts: { [key: string]: number } = {};
		for (const category in categorySums) {
			groupProducts[category] = Number(
				(categorySums[category].sum / categorySums[category].count).toFixed(2)
			);
		}

		return groupProducts;
	}
}
