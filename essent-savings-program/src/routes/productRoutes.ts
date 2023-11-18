import { Router } from 'express';
import ProductController from '../controllers/productControllers';

const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:productId', ProductController.getProductById);
router.post('/', ProductController.createProduct);

export default router;
