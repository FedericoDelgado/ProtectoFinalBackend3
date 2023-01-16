import { logger } from '../utils/winston.util.js';

const isLogged = ((req, res, next) => {
  let msgError = 'Para acceder a esta URL debe iniciar sesión';
  if (req.user) {
    next();
  }
  else {
    logger.info.error('auth::: ' + msgError);
    return res.render('error-view', { msgError });
  }
}); 

export { isLogged }