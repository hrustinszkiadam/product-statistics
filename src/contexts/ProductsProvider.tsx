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
import { fetchProducts, ProductsResponseItem } from '@/constants/api';
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

			const withoutId: Product[] = data.map((product: ProductsResponseItem) => {
				return {
					...product,
					id: undefined,
				};
			});

			const productStatistics = new ProductStatistics(withoutId);

			return productStatistics;
		},
	});

	const averagePriceGroupByCategory = useMemo(() => {
		if (!productStatistics) return {};
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
