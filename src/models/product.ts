import fs from 'fs';
import path from 'path';
import rootDir from '../util/path';

export interface IProduct {
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
	constructor(
		public title: string,
		public price: string,
		public description: string,
		public image: string
	) {}

	public save(): void {
		saveData(this);
	}

	static fetchAll(callback: Callback): void {
		retrieveData(callback);
	}
}
