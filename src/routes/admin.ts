import { Router } from 'express';
import { getAddProduct, postAddProduct } from '../controllers/products';

const router = Router();

router.get('/add-product', getAddProduct);
router.post('/product', postAddProduct);

export default router;
