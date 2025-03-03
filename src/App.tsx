import ProductsTable from './components/ProductsTable';
import ProductsProvider from './contexts/ProductsProvider';

const App = () => {
	return (
		<ProductsProvider>
			<div className='m-0 p-10'>
				<ProductsTable />
			</div>
		</ProductsProvider>
	);
};

export default App;
