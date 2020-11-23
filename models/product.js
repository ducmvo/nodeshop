const products = [];

module.exports = class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    save() {
        products.push(this)
    }

    static fetchAll() {
        return products;
    }
}