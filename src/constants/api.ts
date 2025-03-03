import { Product } from '@/models/ProductStatistics/ProductStatistics.d';

export const API_URL = 'https://retoolapi.dev/6eCWio/products' as const;

type ProductsResponseItem = Product & {
	id: number;
};

export const fetchProducts = async (): Promise<Product[] | undefined> => {
	const response = await fetch(API_URL);
	const data: ProductsResponseItem[] | undefined = await response.json();

	if (!response.ok || !data) return undefined;

	const randomProducts = data.sort(() => Math.random() - 0.5).slice(0, 25);

	return randomProducts.map((p) => {
		return {
			name: p.name,
			price: Number(p.price),
			category: p.category,
		};
	}) as Product[];
};
