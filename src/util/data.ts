import asyncFs from 'fs/promises';
import { dataPath } from './path';
import { IProduct } from '../models/product';

export type Callback = (products: IProduct[]) => void;

export const retrieveData = async (callback: Callback): Promise<void> => {
	try {
		const data = await asyncFs.readFile(dataPath);
		const  products = JSON.parse(data.toString())
		callback(products)
		
	} catch(err) {
		console.log(err.message);
		callback([])
	}
};

const findAndReplace = (arr: IProduct[], item: IProduct) => {
	const idx = arr.findIndex((i) => i.id === item.id);
	if (idx!==-1){
		arr[idx] = item;
	} else {
		arr.push(item);
	}
	return idx;
};

const findAndDelete = (arr: IProduct[], id: string) => {
	return arr.filter((i) => i.id !== id);
};

export const saveData = (instance: IProduct): void => {
	retrieveData((products) => {
		findAndReplace(products, instance);
		asyncFs.writeFile(dataPath, JSON.stringify(products))
			.then(() => {
				console.log("successfully write to file")
			})
			.catch((err) => {
				console.log('Error! ', err);
			});
	});
};

export const deleteData = (id: string): void => {
	retrieveData((products) => {
		products = findAndDelete(products, id);
		asyncFs.writeFile(dataPath, JSON.stringify(products))
			.then(() => {
				console.log("successfully write to file")
			})
			.catch((err) => {
				console.log('Error! ', err);
			});
	});
};

export const fetchProduct = (
	cb: (product: IProduct | undefined) => void,
	productId: string
): void => {
	//retrieveData callback: execute after finish retrieve data
	const callback = (products: IProduct[]) => {
		const product = products.find((product) => product.id === productId);
		//fetchProduct callback: execute after find product in the retrieve data
		//this callback will do something with the lookup product (eg. execute req.render)
		cb(product);
	};
	retrieveData(callback);
};

export const fetchAll = (callback: Callback): void => {
	retrieveData(callback);
};
