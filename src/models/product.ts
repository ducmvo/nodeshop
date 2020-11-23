import fs from 'fs';
import path from 'path';
import rootDir from '../util/path';

export interface IProduct {
	title: string;
	price: string;
}

type Callback = (products: IProduct[]) => void

const dataPath = path.join(path.dirname(rootDir), 'data', 'products.json');

const retrieveData = (callback: Callback) : void => {
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
        products.push(instance);
        fs.writeFile(dataPath, JSON.stringify(products), (err) => {
            console.log(err);
        });
    });
}

export default class Product {
	constructor(public title: string, public price: string) {}

	public save(): void {
        saveData(this)
    }

	static fetchAll(callback: Callback): void {
		retrieveData(callback)
	}
}
