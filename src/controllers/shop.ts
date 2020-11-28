import { RequestHandler } from 'express';
import PageInfo from '../models/page';
import { cart } from '../models/cart';
import { fetchProduct, fetchAllProducts } from '../util/data';

export const getProducts: RequestHandler = async (req, res) => {
	const products = await fetchAllProducts();
	const pageInfo = new PageInfo('Shop', '/products', { products: products });
		res.render('shop/product-list', pageInfo);
};

export const getProduct: RequestHandler = async (req, res) => {
	const product = await fetchProduct(+req.params.productId);
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
};

export const getIndex: RequestHandler = async (req, res) => {
	const products = await fetchAllProducts();
	const pageInfo = new PageInfo('Home', '/', { products: products });
	res.render('shop/index', pageInfo);
};

export const getCart: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Cart', '/cart', { cart: cart });
	res.render('shop/cart', pageInfo);
};

export const postCart: RequestHandler = async (req, res) => {
	const productId: number = +req.body.productId;
	const product = await fetchProduct(productId);
	if (product) {
		cart.addItem(product);
	}
	res.redirect('/cart');
};

export const removeCartItem: RequestHandler = (req, res) => {
	const productId: number = +req.body.productId;
	cart.removeItem(productId)
	res.redirect('/cart');
}

export const getCheckout: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Checkout', '/checkout');
	res.render('shop/checkout', pageInfo);
};

export const getOrders: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Orders', '/orders');
	res.render('shop/orders', pageInfo);
};
