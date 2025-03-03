import {
	FC,
	PropsWithChildren,
	useDeferredValue,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { ProductsContext } from './ProductsContext';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/constants/api';
import { Product } from '@/models/ProductStatistics/ProductStatistics.d';
import ProductStatistics from '@/models/ProductStatistics/ProductStatistics.entity';

const ProductsProvider: FC<PropsWithChildren> = ({ children }) => {
	const { data: productStatistics } = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const data = await fetchProducts();

			if (!data) {
				console.error('Failed to fetch products');
				return new ProductStatistics([]);
			}

			try {
				const productStatistics = new ProductStatistics(data);
				return productStatistics;
			} catch (error) {
				console.error('Failed to create product statistics', error);
				return new ProductStatistics([]);
			}
		},
	});

	const averagePriceGroupByCategory = useMemo(() => {
		if (!productStatistics || !productStatistics.products.length) return {};
		return productStatistics.getAveragePriceGroupByCategory();
	}, [productStatistics]);

	const [category, setCategory] = useState('');
	const slowCategory = useDeferredValue(category);

	const [filteredProducts, setFilteredProducts] = useState<Product[]>(
		productStatistics?.products || []
	);

	useEffect(() => {
		if (!productStatistics) return;
		const filtered = productStatistics.products.filter(
			(product) => product.category === slowCategory
		);

		setFilteredProducts(filtered);
	}, [slowCategory, productStatistics]);

	return (
		<ProductsContext.Provider
			value={{
				productStatistics,
				averagePriceGroupByCategory,
				filteredProducts,
				category,
				setCategory,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export default ProductsProvider;
