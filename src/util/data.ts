import Product, {IProduct} from '../models/product';

export const saveProduct = async (
	product: Product
): Promise<Product | null> => {
	try {
		const instance = await product.save();
		console.log('Successfully product save to database');
		return instance;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const createProduct = async (
	product: IProduct
): Promise<Product | null> => {
	try {
		const instance = await Product.create(product);
		console.log('Successfully insert a new product to database');
		return instance;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const deleteProduct = async (product: Product): Promise<void> => {
	try {
		await product.destroy();
		console.log('Successfully delete product from database');
	} catch (err) {
		console.log(err);
	}
};

export const fetchProduct = async (
	productId: number
): Promise<Product | null> => {
	try {
		const product = await Product.findByPk(productId);
		return product;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const fetchAllProducts = async (): Promise<Product[]> => {
	try {
		const products = await Product.findAll();
		return products;
	} catch (err) {
		console.log(err);
		return [];
	}
};
