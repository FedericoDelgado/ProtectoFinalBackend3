import express from 'express';
import {
  getAllProductsByIdCart,
  createCart,
  viewCart,
  addProductToCart,
  deleteCartById,
  deleteProductById,
} from '../controllers/cart.controller.js';
 
const router = express.Router();

router.get('/:id/product', getAllProductsByIdCart);
router.get('/', viewCart);
router.post('/', createCart);
router.post('/add-product', addProductToCart);
router.post('/delete-product', deleteProductById);

//router.post('/:idCar/:idProd', addProductToCart);
//router.delete('/:id/product/:id_prod', deleteProductById);

router.delete('/:id', deleteCartById);

export default router;