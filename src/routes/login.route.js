import express from 'express';
import passport from 'passport';
import { login, serializeUser, deserializeUser } from '../utils/passport.util.js';
import { loginFormController } from '../controllers/user.controller.js';

const router = express.Router();

//Authentication
login();
serializeUser();
deserializeUser();
 
router.get('/', loginFormController);
router.post('/', passport.authenticate('login', {
    successRedirect: '/welcome',
    failureRedirect: '/error/Error: usuario o contraseña incorrecta',
    failureFlash: true
}));

export default router;