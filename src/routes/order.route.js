import express from 'express';
import {
  createOrdenController,
  viewOrderController
} from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', viewOrderController);
router.post('/', createOrdenController);
 
export default router;