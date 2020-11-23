import { RequestHandler } from 'express';
import Product from '../models/product';

export const getAddProduct: RequestHandler = (req, res) => {
	res.render('add-product', { pageTitle: 'Add Product', path: '/add-product' });
};

export const postAddProduct: RequestHandler = (req, res) => {
    const product = new Product(req.body.title, req.body.price);
    product.save()
	res.redirect('/');
}

export const getProducts: RequestHandler = (req, res) => {
    const products = Product.fetchAll()
	res.render('shop', {products: products, pageTitle: "Shop", path:"/"})
};