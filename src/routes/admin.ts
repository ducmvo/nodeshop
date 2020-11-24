import { Router } from 'express';
import {
	getAddProduct,
	postAddProduct,
	getProducts
} from '../controllers/admin';

const router = Router();

router.get('/products', getProducts);
router.get('/add-product', getAddProduct);

router.post('/product', postAddProduct);

export default router;
