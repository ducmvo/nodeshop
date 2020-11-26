import { RequestHandler } from 'express';
import Product from '../models/product';
import { cart } from '../models/cart';
import PageInfo from '../models/page';
import { IProduct } from '../models/product';
import { fetchAllProducts, fetchProduct } from '../util/data';

export const getAddProduct: RequestHandler = (_req, res) => {
	const pageInfo = new PageInfo('Add Product', '/admin/add-product',{onEdit: false});
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
	res.redirect(`/products/${instance.id}`)
};

export const getEditProduct: RequestHandler = (req, res) => {
	const productId = +req.params.productId
	fetchProduct((product) => {
		if(!product) {
			return res.redirect('/')
		}
		const pageInfo = new PageInfo('Edit Product', `/admin/edit-product/${productId}`, { onEdit: true, product: product});
		res.render('admin/edit-product', pageInfo);
	}, productId);	
};

export const postEditProduct: RequestHandler = (req, res) => {
	const body: {productId: number, title: string, price: number, description: string, image: string} = req.body
	const productId = +body.productId
	fetchProduct((product) => {
		if(product) {
			const product = new Product(
				body.title,
				body.price,
				body.description,
				body.image
			);
			product.id = productId
			product.save()
			cart.update(product)
		} 
		
		res.redirect(`/products/${productId}`)
	}, productId);
};

export const postDeleteProduct: RequestHandler = (req, res) => {
	const productId = +req.params.productId
	Product.delete(productId)
	cart.removeItem(productId)
	res.redirect('/admin/list-products')
};

export const getProducts: RequestHandler = (_req, res) => {
	fetchAllProducts((products: IProduct[]): void => {
		const pageInfo = new PageInfo('Listing', '/admin/list-products', {
			products: products
		});
		res.render('admin/list-products', pageInfo);
	});
};
