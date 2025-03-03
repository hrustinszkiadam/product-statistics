import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { Product } from '../models/ProductStatistics/ProductStatistics';

export const ProductsContext = createContext<TProductsContext | undefined>(
	undefined
);

export type TProductsContext = {
	products: Product[];
	category: string;
	setCategory: Dispatch<SetStateAction<string>>;
	averagePriceByCategory: {
		[key: string]: number;
	};
};

const useProducts = () => {
	if (!ProductsContext) {
		throw new Error('useProducts must be used within a ProductsProvider');
	}

	return useContext(ProductsContext);
};

export default useProducts;
