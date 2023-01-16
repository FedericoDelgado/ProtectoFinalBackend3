import express from 'express';
import passport from 'passport';
//
import { fileUpload } from '../utils/multer.util.js';
import { signup, serializeUser, deserializeUser } from '../utils/passport.util.js';
import { signupFormController } from '../controllers/user.controller.js';

const router = express.Router();
 
//Authentication
signup();
serializeUser();
deserializeUser();

router.get('/', signupFormController);
router.post('/', fileUpload.single('avatar'), passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/error/Error al crear la cuenta ingrese otro usuario',
    failureFlash: true
}));

export default router;