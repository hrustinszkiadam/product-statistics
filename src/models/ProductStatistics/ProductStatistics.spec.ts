/* eslint-disable @typescript-eslint/ban-ts-comment */
import IProductStatistics from './ProductStatistics.d';
import ProductStatistics from './ProductStatistics.entity';
import { beforeEach, describe, expect, it } from 'vitest';

describe('ProductStatistics', () => {
	let productStatistics: IProductStatistics = new ProductStatistics([]);

	beforeEach(() => {
		productStatistics = new ProductStatistics([]);
	});

	describe('constructor', () => {
		it('should create a new instance of ProductStatistics', () => {
			expect(productStatistics).toBeInstanceOf(ProductStatistics);
			expect(Array.isArray(productStatistics.products)).toBe(true);
			expect(productStatistics.products.length).toEqual(0);
		});

		it('should create a new instance of ProductStatistics with products', () => {
			const products = [
				{ name: 'Product1', category: 'Category1', price: 100 },
				{ name: 'Product2', category: 'Category2', price: 200 },
				{ name: 'Product3', category: 'Category3', price: 300 },
			];

			const productStatistics = new ProductStatistics(products);

			expect(productStatistics).toBeInstanceOf(ProductStatistics);
			expect(productStatistics.products).toEqual(products);
		});

		it('should throw an error if no products are provided', () => {
			const undList: unknown = undefined;
			const nullList: unknown = null;
			// @ts-ignore
			expect(() => new ProductStatistics(undList)).toThrowError();
			// @ts-ignore
			expect(() => new ProductStatistics(nullList)).toThrowError();
		});

		it('should throw an error if some products are invalid', () => {
			const validProduct = {
				name: 'Product',
				category: 'Category',
				price: 100,
			};
			const invalidProduct = { name: 'Product', category: 'Category' };
			expect(
				// @ts-ignore
				() => new ProductStatistics([validProduct, invalidProduct])
			).toThrow();
		});
	});

	describe('getAveragePrice', () => {
		it('should get the average price of the products', () => {
			const products = [
				{ name: 'Product1', category: 'Category1', price: 100 },
				{ name: 'Product2', category: 'Category2', price: 200 },
				{ name: 'Product3', category: 'Category3', price: 300 },
			];

			const productStatistics = new ProductStatistics(products);

			expect(productStatistics.getAveragePrice()).toEqual(200);
		});

		it('should throw an error if no products are provided', () => {
			expect(() => productStatistics.getAveragePrice()).toThrow();
		});
	});

	describe('getMostExpensiveProduct', () => {
		it('should get the most expensive product', () => {
			const products = [
				{ name: 'Product1', category: 'Category1', price: 100 },
				{ name: 'Product2', category: 'Category2', price: 200 },
				{ name: 'Product3', category: 'Category3', price: 300 },
			];

			const productStatistics = new ProductStatistics(products);

			expect(productStatistics.getMostExpensiveProduct()).toEqual({
				name: 'Product3',
				category: 'Category3',
				price: 300,
			});
		});

		it('should throw an error if no products are provided', () => {
			expect(() => productStatistics.getMostExpensiveProduct()).toThrow();
		});
	});

	describe('getCheapestProduct', () => {
		it('should get the cheapest product', () => {
			const products = [
				{ name: 'Product1', category: 'Category1', price: 100 },
				{ name: 'Product2', category: 'Category2', price: 200 },
				{ name: 'Product3', category: 'Category3', price: 300 },
			];

			const productStatistics = new ProductStatistics(products);

			expect(productStatistics.getCheapestProduct()).toEqual({
				name: 'Product1',
				category: 'Category1',
				price: 100,
			});
		});

		it('should throw an error if no products are provided', () => {
			expect(() => productStatistics.getCheapestProduct()).toThrow();
		});
	});

	describe('getAveragePriceByCategory', () => {
		it('should get the average price of the products by category', () => {
			const products = [
				{ name: 'Product1', category: 'Category1', price: 100 },
				{ name: 'Product2', category: 'Category1', price: 200 },
				{ name: 'Product3', category: 'Category1', price: 300 },
			];

			const productStatistics = new ProductStatistics(products);

			expect(productStatistics.getAveragePriceByCategory('Category1')).toEqual(
				200
			);
		});

		it('should throw an error if no products are provided', () => {
			expect(() =>
				productStatistics.getAveragePriceByCategory('Category1')
			).toThrow();
		});

		it('should throw an error if no product with the category is found', () => {
			const products = [
				{ name: 'Product1', category: 'Category1', price: 100 },
				{ name: 'Product2', category: 'Category1', price: 200 },
				{ name: 'Product3', category: 'Category1', price: 300 },
			];

			const productStatistics = new ProductStatistics(products);

			expect(() =>
				productStatistics.getAveragePriceByCategory('Category2')
			).toThrow();
		});
	});

	describe('getAveragePriceGroupByCategory', () => {
		it('should get the average price of the products by category', () => {
			const products = [
				{ name: 'Product1', category: 'Category1', price: 100 },
				{ name: 'Product2', category: 'Category1', price: 200 },
				{ name: 'Product3', category: 'Category2', price: 300 },
			];

			const productStatistics = new ProductStatistics(products);

			expect(productStatistics.getAveragePriceGroupByCategory()).toEqual({
				Category1: 150,
				Category2: 300,
			});
		});

		it('should throw an error if no products are provided', () => {
			expect(() =>
				productStatistics.getAveragePriceGroupByCategory()
			).toThrow();
		});
	});
});
