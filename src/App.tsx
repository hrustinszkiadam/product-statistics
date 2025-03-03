import ProductsProvider from './contexts/ProductsProvider';

const App = () => {
	return (
		<ProductsProvider>
			<div>App</div>
		</ProductsProvider>
	);
};

export default App;
