import { RequestHandler } from 'express';
import PageInfo from '../models/page';
import { cart } from '../models/cart';
import { fetchProduct, fetchAll } from '../util/data';

export const getProducts: RequestHandler = (req, res) => {
	fetchAll((products) => {
		const pageInfo = new PageInfo('Shop', '/products', { products: products });
		res.render('shop/product-list', pageInfo);
	});
};

export const getProduct: RequestHandler = (req, res) => {
	fetchProduct((product) => {
		if (product) {
			const pageInfo = new PageInfo(
				'Product Detail',
				`/products/${product.id}`,
				{ product: product }
			);
			res.render('shop/product-detail', pageInfo);
		} else {
			res.redirect('/');
		}	
	}, req.params.productId);
};

export const getIndex: RequestHandler = (req, res) => {
	fetchAll((products) => {
		const pageInfo = new PageInfo('Home', '/', { products: products });
		res.render('shop/index', pageInfo);
	});
};

export const getCart: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Cart', '/cart', { cart: cart });
	res.render('shop/cart', pageInfo);
};

export const postCart: RequestHandler = (req, res) => {
	const productId = req.body.productId;
	fetchProduct((product) => {
		if (product) {
			cart.addItem(product);
		}
		res.redirect('/cart');
	}, productId);
};

export const getCheckout: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Checkout', '/checkout');
	res.render('shop/checkout', pageInfo);
};

export const getOrders: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Orders', '/orders');
	res.render('shop/orders', pageInfo);
};
