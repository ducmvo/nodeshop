import { IProduct } from '../models/product';
import db from './database';

export type Callback = (products: IProduct[]) => void;

export const dbQuery = async (
	query: string,
	values: (string | number)[] = []
): Promise<IProduct[]> => {
	try {
		const data = await db.execute(query, values);
		const [rows] = data;
		const products: IProduct[] = JSON.parse(JSON.stringify(rows));
		return products;
	} catch (err) {
		console.log(err.message);
		return [];
	}
};

export const saveProduct = async (product: IProduct): Promise<void> => {
	try {
		const { id, title, price, description, image } = product;
		const values = [title, price, description, image];
		const updateValues = [...values, id];
		const insert = `
			INSERT INTO products (title, price, description, image)
			VALUES (?,?,?,?);`;
		const update = `
			UPDATE products
			SET title = ?, 
				price = ?,
				description = ?,
				image = ?
			WHERE id = ?;`;
		await dbQuery(id ? update : insert, id ? updateValues : values);
		console.log('Successfully write to database');
	} catch (err) {
		console.log(err);
	}
};

export const deleteProduct = async (productId: number): Promise<void> => {
	try {
		const query = `DELETE FROM products where id=?;`;
		console.log(query);
		await dbQuery(query, [productId]);
		console.log(`Successfully delete to product ${productId}`);
	} catch (err) {
		console.log(err);
	}
};

export const fetchProduct = async (productId: number): Promise<IProduct|undefined> => {
	try {
		const query = `SELECT id, title, price, description, image FROM products WHERE id = ?;`;
		const products = await dbQuery(query, [productId]);
		return products[0];
	} catch (err) {
		console.log(err);
	}
};

export const fetchAllProducts = async (): Promise<IProduct[]> => {
	try {
		const query = 'SELECT * FROM products;';
		const products = await dbQuery(query);
		return products;
	} catch (err) {
		console.log(err);
		return [];
	}
};
