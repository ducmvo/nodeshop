import fs from 'fs';
import path from 'path';
import rootDir from '../util/path';

export interface IProduct {
	id: string;
	title: string;
	price: string;
	description: string;
	image: string;
}

type Callback = (products: IProduct[]) => void;

const dataPath = path.join(path.dirname(rootDir), 'data', 'products.json');

const retrieveData = (callback: Callback): void => {
	fs.readFile(dataPath, (err, fileContent) => {
		if (err) {
			return callback([]);
		} else {
			callback(JSON.parse(fileContent.toString()));
		}
	});
};

const saveData = (instance: IProduct) => {
	retrieveData((products) => {
		instance.id = Math.random().toString();
		if (!instance.image) {
			instance.image =
				'https://image.freepik.com/free-psd/paper-coffee-bags-mockup_58466-11166.jpg';
		}
		products.push(instance);
		fs.writeFile(dataPath, JSON.stringify(products), (err) => {
			console.log(err);
		});
	});
};

export default class Product {
	id: string;
	constructor(
		public title: string,
		public price: string,
		public description: string,
		public image: string,
	) {
		this.id = Math.random().toString();
	}

	public save(): void {
		saveData(this);
	}

	static fetchAll(callback: Callback): void {
		retrieveData(callback);
	}

	static fetchProduct(cb: (product: IProduct| undefined) => void , id: string): void {
		//retrieveData callback: execute after finish retrieve data
		const callback = (products: IProduct[]) => {
			const product = products.find(product=>product.id===id)
			//fetchProduct callback: execute after find product in the retrieve data
			//this callback will execute req.render
			cb(product)
		}

		retrieveData(callback);
	}
}
