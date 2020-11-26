import { Router } from 'express';
import {
	getAddProduct,
	postAddProduct,
	getProducts,
	getEditProduct,
	postEditProduct,
	postDeleteProduct
} from '../controllers/admin';

const router = Router();

router.get('/list-products', getProducts);
router.get('/add-product', getAddProduct);

router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct)
router.post('/edit-product', postEditProduct)

router.post('/delete-product/:productId', postDeleteProduct)

export default router;
