import { logger } from '../utils/winston.util.js';

const signupFormController = (req, res) => {
  return res.render('index');
}
 
const loginFormController = (req, res) => {
  return res.render('login');
}

const logoutController = (req, res) => {
  if (req.user) {
    const userLogout = req.user.username;
    res.render('logout', { userLogout });
    req.session.destroy(error => {
      if (!error) {
        logger.info.info('logout successfully');
      }
      else {
        logger.info.error('logout error');
      }
    });
  }
}

const profileController = (req, res) => {
  const userLog = req.user;
  res.render('profile', { userLog });
};

export {
  signupFormController,
  loginFormController,
  logoutController,
  profileController
};