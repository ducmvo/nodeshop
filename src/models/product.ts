import { saveData } from '../util/data';

export interface IProduct {
	id: string;
	title: string;
	price: string;
	description: string;
	image: string;
}

export default class Product {
	id: string;
	constructor(
		public title: string,
		public price: string,
		public description: string,
		public image: string
	) {
		this.id = Math.random().toString();
	}

	public save(): void {
		saveData(this);
	}
}
