import express from 'express';
import { profileController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', profileController);
 
export default router;