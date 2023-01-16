import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import { serverConfig } from '../configs/server.config.js';
import { logger } from '../utils/winston.util.js';
import { sendMail } from '../utils/nodemailer.util.js';
import { userModel } from '../models/user.model.js';


const serializeUser = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
} 

const deserializeUser = () => {
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    }
    catch (error) {
      logger.info.error('deserializeUser::: ' + error);
      done(err);
    }
  });
}

const signup = () => {
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  }, 
  async (req, username, password, done) => {
    try {
      const user = await userModel.findOne({ username });
      if (user) {
        return done(null, false);
      }

      const userNew = new userModel();      
      userNew.username = username;
      userNew.password = await userNew.encryptPassword(password);
      userNew.email = req.body.email;
      userNew.phone = req.body.tel;
      userNew.age = req.body.edad;
      userNew.address = req.body.direccion;
      userNew.photo = req.file.filename;
      userNew.cart = [];
      userNew.admin = false;

      const mailOptions = {
        from: serverConfig.MAILER_USER,
        to: serverConfig.MAILER_USER_TO,
        subject: 'Nuevo registro',
        html: `
          <h3>Nuevo registro de usuario!</h3>
          <p> Datos:</p>
          <ul>
          <li> Nombre: ${userNew.username}</li>
          <li> Email: ${userNew.email}</li>
          <li> Teléfono: ${userNew.phone}</li>
          <li> Edad: ${userNew.age}</li>
          <li> Dirección: ${userNew.address}</li>
          </ul>
        `
      };

      const userSave = await userNew.save();
      const email = await sendMail(mailOptions);

      return done(null, userSave);
    }
    catch(error) {
      logger.info.error('signup::: ' + error);
      done(error);
    }
  }));
}

const login = () => {
  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  async (req, username, password, done) => {
    try {
      const user = await userModel.findOne({ username });
      if (!user) {
        return done(null, false);
      }
      const matchPassword = await user.checkPassword(password);
      if (!matchPassword) {
        return done(null, false);
      }
      return done(null, user);
    }
    catch (error) {
      logger.info.error('login::: ' + error);
      done(error);
    }
  }));
}

export { 
  serializeUser,
  deserializeUser,
  signup,
  login
}