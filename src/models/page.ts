import { IProduct } from '../models/product';

interface IPageInfo {
	pageTitle: string;
	path: string;
	kwargs?: {
		products?: IProduct[],
		product?: IProduct
	}
}

export default class PageInfo implements IPageInfo {
	constructor(
		public pageTitle: string,
		public path: string,
		public kwargs?: {
			products?: IProduct[],
			product?: IProduct
		}
	) {

	}
}
