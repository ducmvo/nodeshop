import { saveProduct, deleteProduct } from '../util/data';

export interface IProduct {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
}

export default class Product {
	public id: number;
	constructor(
		public title: string,
		public price: number,
		public description: string,
		public image: string
	) {
		this.id = 0;
	}

	public async save(): Promise<IProduct> {
		await saveProduct(this)
		return this;
	}

	static delete(id: number): void {
		deleteProduct(id)
	}

}
