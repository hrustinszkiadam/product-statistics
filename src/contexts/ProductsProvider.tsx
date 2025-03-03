import { FC, PropsWithChildren } from 'react';
import { ProductsContext } from './ProductsContext';

const ProductsProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ProductsContext.Provider values={{}}>{children}</ProductsContext.Provider>
	);
};
