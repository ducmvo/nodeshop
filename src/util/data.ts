import { IProduct } from '../models/product';
import db from './database';

export type Callback = (products: IProduct[]) => void;

export const dbQuery = async (query: string): Promise<IProduct[]> => {
	try {
		const data = await db.execute(query)
		const [ rows ] = data;	
		const products: IProduct[] = JSON.parse(JSON.stringify(rows))
		return products;
	} catch(err) {
		console.log(err.message);
		return [];
	}
};

export const saveProduct = async (product: IProduct): Promise<void> => {
	try {
		const {id, title, price, description, image} = product;
		const insert = `
			INSERT INTO products (title, price, description, image)
			VALUES ('${title}', '${price}', '${description}','${image}');`;
		const update = `
			UPDATE products
			SET title = '${title}', 
				price = '${price}',
				description = '${description}',
				image = '${image}'
			WHERE id = ${id};`
		console.log(id?update:insert)
		await dbQuery(id?update:insert);
		console.log("Successfully write to database")
	} catch (err) {
		console.log(err)
	}
};

export const deleteProduct = async (productId: number): Promise<void> => {
	try {
		const query = `DELETE FROM products where id=${productId};`
		console.log(query)
		await dbQuery(query);
		console.log(`Successfully delete to product ${productId}`)
	} catch (err) {
		console.log(err)
	}
};

export const fetchProduct = async (
	callback: (product: IProduct) => void,
	productId: number
): Promise<void> => {
	try {
		const query = `SELECT id, title, price, description, image FROM products WHERE id = ${productId};`
		const products = await dbQuery(query);
		callback(products[0])
	}
	catch (err) {
		console.log(err)
	}
};

export const fetchAllProducts = async (callback: Callback): Promise<void> => {
	try {
		const query = "SELECT * FROM products;"
		const products = await dbQuery(query);
		console.log(products)
		callback(products)
	} catch (err) {
		console.log(err)
	}
};
