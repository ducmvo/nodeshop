import { RequestHandler } from 'express';
import Product from '../models/product';
import PageInfo from '../models/page';
import { IProduct } from '../models/product';

export const getProducts: RequestHandler = (req, res) => {
	const callback = (products: IProduct[]): void => {
		const pageInfo = new PageInfo('Shop', '/products', products);
		res.render('shop/product-list', pageInfo);
	};
	Product.fetchAll(callback);
};

export const getIndex: RequestHandler = (req, res) => {
	const callback = (products: IProduct[]): void => {
		const pageInfo = new PageInfo('Home', '/', products);
		res.render('shop/index', pageInfo);
	};
	Product.fetchAll(callback);
};

export const getCart: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Cart', '/cart');
	res.render('shop/cart', pageInfo);
};

export const getCheckout: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Checkout', '/checkout');
	res.render('shop/checkout', pageInfo);
};

export const getOrders: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Orders', '/orders');
	res.render('shop/orders', pageInfo);
};

