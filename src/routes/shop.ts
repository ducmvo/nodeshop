import { Router } from 'express';
import {
	getProducts,
	getProduct,
	getIndex,
	getCart,
	postCart,
	getCheckout,
	getOrders
} from '../controllers/shop';

const router = Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.get('/checkout', getCheckout);

router.get('/orders', getOrders);

export default router;
