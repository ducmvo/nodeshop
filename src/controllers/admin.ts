import { RequestHandler } from 'express';
import Product from '../models/product';
import { cart } from '../models/cart';
import PageInfo from '../models/page';
import { IProduct } from '../models/product';
import { fetchAllProducts, fetchProduct } from '../util/data';

export const getAddProduct: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Add Product', '/admin/add-product', {
		onEdit: false
	});
	res.render('admin/edit-product', pageInfo);
};

export const postAddProduct: RequestHandler = async (req, res) => {
	const body = req.body as IProduct;
	const product = new Product(
		body.title,
		body.price,
		body.description,
		body.image
	);
	const instance = await product.save();
	res.redirect(`/products/${instance.id}`);
};

export const getEditProduct: RequestHandler = async (req, res) => {
	const productId = +req.params.productId;
	const product = await fetchProduct(productId);
	if (product) {
		const pageInfo = new PageInfo(
			'Edit Product',
			`/admin/edit-product/${productId}`,
			{ onEdit: true, product: product }
		);
		return res.render('admin/edit-product', pageInfo);
	}
	return res.redirect('/');
};

export const postEditProduct: RequestHandler = async (req, res) => {
	const body: {
		productId: number;
		title: string;
		price: number;
		description: string;
		image: string;
	} = req.body;
	const productId = +body.productId;
	const product = await fetchProduct(productId);
	if (product) {
		const product = new Product(
			body.title,
			body.price,
			body.description,
			body.image
		);
		product.id = productId;
		product.save();
		cart.update(product);
	}

	res.redirect(`/products/${productId}`);
};

export const postDeleteProduct: RequestHandler = (req, res) => {
	const productId = +req.params.productId;
	Product.delete(productId);
	cart.removeItem(productId);
	res.redirect('/admin/list-products');
};

export const getProducts: RequestHandler = async (req, res) => {
	const products = await fetchAllProducts();
	const pageInfo = new PageInfo('Listing', '/admin/list-products', {
		products: products
	});
	res.render('admin/list-products', pageInfo);
};
