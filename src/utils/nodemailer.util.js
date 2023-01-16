import nodemailer from 'nodemailer'
import { serverConfig } from '../configs/server.config.js';
import { logger } from './winston.util.js';

const transporter = nodemailer.createTransport({
  host: serverConfig.MAILER_HOST,
  port: serverConfig.MAILER_PORT,
  secure: true, // use TLS
  auth: {
    user: serverConfig.MAILER_USER,
    pass: serverConfig.MAILER_PASS,
  }, 
  tls: {
    rejectUnauthorized: false
  }
});


const sendMail = async (options) => {
  try {
    const response = await transporter.sendMail(options);
    logger.info.info('sendMail::: ' + response);   
  }
  catch (error) {
    logger.info.error('sendMail::: ' + error);     
  }
}

export { sendMail }