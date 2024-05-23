// src/presentation/routes/productRoutes.ts
import { Router } from 'express';
import { ProductController } from 'src/web/controllers/ProductController';
import upload from 'src/infra/middleware/Upload';

const router = Router();
const productController = new ProductController();

router.post('/', upload.single('image') ,productController.create);
router.get('/', productController.get);
router.get('/:id', productController.getById);
router.put('/:id', upload.single('image'), productController.update);

export default router;
