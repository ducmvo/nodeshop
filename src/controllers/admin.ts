import { RequestHandler } from 'express';
import Product from '../models/product';
import PageInfo from '../models/page';
import { IProduct } from '../models/product';

export const getAddProduct: RequestHandler = (_req, res) => {
	const pageInfo = new PageInfo('Add Product', '/admin/add-product');
	res.render('admin/add-product', pageInfo);
};

export const postAddProduct: RequestHandler = (req, res) => {
	const body = req.body as IProduct;
	const product = new Product(body.title, body.price, body.description, body.image);
	product.save();
	res.redirect('/');
};

export const getProducts: RequestHandler = (req, res) => {
	const callback = (products: IProduct[]): void => {
		const pageInfo = new PageInfo('Listing', '/admin/list-products', { products: products });
		res.render('admin/list-products', pageInfo);
	};
	Product.fetchAll(callback);
};