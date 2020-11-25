import { IProduct } from '../models/product';
import { Cart } from '../models/cart';

interface IPageInfo {
	pageTitle: string;
	path: string;
	kwargs?: {
		products?: IProduct[];
		product?: IProduct;
		cart?: Cart;
		onEdit?: boolean;
	};
}

export default class PageInfo implements IPageInfo {
	constructor(
		public pageTitle: string,
		public path: string,
		public kwargs?: {
			products?: IProduct[];
			product?: IProduct;
			cart?: Cart;
			onEdit?: boolean;
		}
	) {}
}
