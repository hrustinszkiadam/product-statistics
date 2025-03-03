import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import ProductStatistics from '@/models/ProductStatistics/ProductStatistics.entity';
import { Product } from '@/models/ProductStatistics/ProductStatistics';

export const ProductsContext = createContext<TProductsContext | undefined>(
	undefined
);

export type TProductsContext = {
	productStatistics: ProductStatistics | undefined;
	averagePriceGroupByCategory: {
		[key: string]: number;
	};
	filteredProducts: Product[];
	category: string;
	setCategory: Dispatch<SetStateAction<string>>;
};

const useProducts = () => {
	if (!ProductsContext) {
		throw new Error('useProducts must be used within a ProductsProvider');
	}

	return useContext(ProductsContext);
};

export default useProducts;
