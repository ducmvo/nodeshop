import { Router } from 'express';
import {
	getAddProduct,
	postAddProduct,
	getProducts,
	getEditProduct,
	postEditProduct
} from '../controllers/admin';

const router = Router();

router.get('/list-products', getProducts);
router.get('/add-product', getAddProduct);

router.post('/product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct)
router.post('/edit-product', postEditProduct)

export default router;
