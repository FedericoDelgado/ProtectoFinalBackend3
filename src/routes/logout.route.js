import express from 'express';
import { logoutController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', logoutController);
 
export default router;