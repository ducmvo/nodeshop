import { saveData } from '../util/data';

export interface IProduct {
	id: string;
	title: string;
	price: string;
	description: string;
	image: string;
}

export default class Product {
	public id: string;
	constructor(
		public title: string,
		public price: string,
		public description: string,
		public image: string
	) {
		this.id = '';
	}

	public save(): IProduct {
		if (!this.id) {
			this.id = Math.random().toString().split('.')[1];
		}
		saveData(this);
		return this;
	}

}
