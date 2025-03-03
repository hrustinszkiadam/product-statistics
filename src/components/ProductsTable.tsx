import useProducts from '@/contexts/ProductsContext';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const ProductsTable = () => {
	const { filteredProducts } = useProducts();

	return (
		<Table className='w-[50vw] mx-auto'>
			<TableCaption>Randomly selected products</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Category</TableHead>
					<TableHead className='text-right'>Price (HUF)</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='overflow-y-scroll'>
				{filteredProducts.map((product) => (
					<TableRow key={`${product.name}-${product.category}`}>
						<TableCell>{product.name}</TableCell>
						<TableCell>{product.category}</TableCell>
						<TableCell className='text-right'>{product.price}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ProductsTable;
