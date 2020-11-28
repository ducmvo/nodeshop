import Product, { IProduct } from './product';

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

	public addItem(product: Product): void {
		if (!product) {
			return
		}
		const itemIndex = this.items.findIndex((item) => item.id === product.id);
		const item = this.items[itemIndex];
		let updatedItem: ICartItem;
		if (item) {
			updatedItem = { ...item };
			updatedItem.quantity = updatedItem.quantity + 1;
			this.items = [...this.items];
			this.items[itemIndex] = updatedItem;
		} else {
			const productValues = {
				id: product.id,
				price: product.price,
				description: product.description,
				title: product.title,
				image: product.image
			}
			updatedItem = { ...productValues, quantity: 1 };
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

	public update = (product: Product): void => {
		//update cart if product properties change
		if (!product) {
			return;
		}
		const itemIndex = this.items.findIndex((item) => item.id === product.id);
		if(itemIndex!==-1) {
			this.items[itemIndex] = {...product, quantity: this.items[itemIndex].quantity};
		}
	}

	public removeItem = (productId: number): void => {
		const newItems = this.items.filter((item) => item.id !== productId);
		this.items = newItems;
		if (newItems.length<=0) {
			this.totalPrice = 0;
		}
		
	}
}

export const cart = Cart.getCart();
