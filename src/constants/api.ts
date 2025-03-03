import { Product } from '@/models/ProductStatistics/ProductStatistics.d';

export const API_URL = 'https://retoolapi.dev/JldPrk/products' as const;

export type ProductsResponseItem = Product & {
	id: number;
};
export type ProductsResponse = ProductsResponseItem[];

export const fetchProducts = async (): Promise<
	ProductsResponse | undefined
> => {
	const response = await fetch(API_URL);
	const data = await response.json();

	if (!response.ok) return undefined;

	const randomProducts = data.sort(() => Math.random() - 0.5).slice(0, 25);

	return randomProducts as ProductsResponse;
};
