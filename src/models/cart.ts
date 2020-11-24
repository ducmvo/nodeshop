export interface ICartItem {
	id: string;
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

	public addItem(id: string, price: number): void {
		const itemIndex = this.items.findIndex((item) => item.id === id);
		const item = this.items[itemIndex];
		let updatedItem: ICartItem;
		if (item) {
			updatedItem = { ...item };
			updatedItem.quantity = updatedItem.quantity + 1;
			this.items = [...this.items];
			this.items[itemIndex] = updatedItem;
		} else {
			updatedItem = { id: id, quantity: 1 };
			this.items = [...this.items, updatedItem];
		}

		this.totalPrice += price;
	}

	public getTotalPrice(): number {
		return this.totalPrice;
	}
}

export const cart = Cart.getCart();