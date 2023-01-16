import express from 'express';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);
 
export default router;