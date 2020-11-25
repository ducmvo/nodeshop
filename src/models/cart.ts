import { IProduct } from './product';

export interface ICartItem extends IProduct {
	quantity: number;
}

export class Cart {
	private static instance: Cart;
	private items: ICartItem[];
	private totalPrice: number;

	private constructor() {
		this.totalPrice = 0;
		this.items = [];
	}

	static getCart(): Cart {
		if (!Cart.instance) {
			Cart.instance = new Cart();
		}
		return Cart.instance;
	}

	public addItem(product: IProduct): void {
		const itemIndex = this.items.findIndex((item) => item.id === product.id);
		const item = this.items[itemIndex];
		let updatedItem: ICartItem;
		if (item) {
			updatedItem = { ...item };
			updatedItem.quantity = updatedItem.quantity + 1;
			this.items = [...this.items];
			this.items[itemIndex] = updatedItem;
		} else {
			updatedItem = {  ...product, quantity: 1 };
			this.items = [...this.items, updatedItem];
		}

		this.totalPrice += parseInt(product.price);
	}

	public getTotalPrice(): number {
		return this.totalPrice;
	}
}

export const cart = Cart.getCart();