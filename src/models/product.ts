interface IProduct {
    title: string;
    price: string;
}
const products: IProduct[] = [];

export default class Product {

    constructor(public title: string, public price: string) {

    }

    public save(): void {
        products.push(this)
    }

    static fetchAll(): IProduct[] {
        return products;
    }
}