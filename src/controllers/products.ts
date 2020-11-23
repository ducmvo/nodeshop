import { RequestHandler } from 'express';
import Product from '../models/product';
import PageInfo from '../models/page';
import { IProduct } from '../models/product';

export const getAddProduct: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Add Product', '/add-product');
	res.render('add-product', pageInfo);
};

export const postAddProduct: RequestHandler = (req, res) => {
	const body = req.body as IProduct;
	const product = new Product(body.title, body.price);
	product.save();
	res.redirect('/');
};

export const getProducts: RequestHandler = (req, res) => {
	const callback = (products: IProduct[]): void => {
		const pageInfo = new PageInfo('Shop', '/', products);
		res.render('shop', pageInfo);
	};
	Product.fetchAll(callback);
};
