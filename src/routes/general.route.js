import express from 'express';
import { isLogged } from '../Middlewares/auth.middleware.js';
import {
  homeController,
  signupController,
  welcomeController,
  formAddProductController,
  errorController
} from '../controllers/general.controller.js';

const router = express.Router();
 
router.get('/', homeController);
router.get('/signup', signupController);
router.get('/welcome', isLogged, welcomeController);
router.get('/add-product', isLogged, formAddProductController);
router.get('/error/:msg', errorController);

export default router;