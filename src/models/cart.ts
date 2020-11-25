import { IProduct } from './product';

export interface ICartItem extends IProduct {
	quantity: number;
}

export class Cart {
	private static instance: Cart;
	public items: ICartItem[];
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
			updatedItem = { ...product, quantity: 1 };
			this.items = [...this.items, updatedItem];
		}
	}

	public getTotalPrice(): number {
		if (this.items.length > 0) {
			this.totalPrice = this.items
				.map((item) => +item.price * +item.quantity)
				.reduce((total, price) => (total += price));
		}
		return this.totalPrice;
	}

	public refresh = (products: IProduct[]): void => {
		if (!products) {
			return;
		}
		const updatedItems: ICartItem[] = []
		for (const item of this.items) {
			const product = products.find((product) => product.id === item.id)
			if (product) {
				const updatedItem = {...product, quantity: item.quantity}
				updatedItems.push(updatedItem);
			}
		}
		this.items = [...updatedItems];
	}
}

export const cart = Cart.getCart();
