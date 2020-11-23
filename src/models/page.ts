import { IProduct } from '../models/product';

interface IPageInfo {
	pageTitle: string;
	path: string;
	products?: IProduct[];
}

export default class PageInfo implements IPageInfo {
	constructor(
		public pageTitle: string,
		public path: string,
		public products?: IProduct[]
	) {}
}
