import { RequestHandler } from 'express';
// import Product from '../models/product';
import { cart } from '../models/cart';
import PageInfo from '../models/page';
import { IProduct } from '../models/product';
import {
	fetchAllProducts,
	fetchProduct,
	saveProduct,
	createProduct,
	deleteProduct
} from '../util/data';

export const getAddProduct: RequestHandler = (req, res) => {
	const pageInfo = new PageInfo('Add Product', '/admin/add-product', {
		onEdit: false
	});
	res.render('admin/edit-product', pageInfo);
};

export const postAddProduct: RequestHandler = async (req, res) => {
	const body = req.body as IProduct;
	const product: IProduct = {
		title: body.title,
		price: +body.price,
		description: body.description,
		image: body.image
	};
	const instance = await createProduct(product);
	if (instance) {
		res.redirect(`/products/${instance.id}`);
	} else {
		res.redirect('/add-product');
	}
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
	const productId = +req.body.productId;
	const product = await fetchProduct(productId);
	if (product) {
		product.title = req.body.title;
		product.price = +req.body.price;
		product.description = req.body.description;
		product.image = req.body.image;
		const instance = await saveProduct(product);
		if (instance) {
			return res.redirect(`/products/${productId}`);
		}
	} else {
		return res.redirect('/add-product');
	}
};

export const postDeleteProduct: RequestHandler = async (req, res) => {
	const productId = +req.params.productId;
	const product = await fetchProduct(productId);
	if (product) {
		await deleteProduct(product);
	}
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
