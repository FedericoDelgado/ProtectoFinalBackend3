import { serverConfig } from '../configs/server.config.js';
import { Storage }  from "../daos/index.js";
import { logger } from '../utils/winston.util.js';
import { sendMail } from '../utils/nodemailer.util.js';
import { sendSms, sendWhatsApp } from '../utils/twilio.util.js';

const storage = Storage().order;

const createOrdenController = async (req, res) => {
  try {
    const userLog = req.user;
    const userId = req.body.idUser;
    const order = await storage.createOrder(userId);
 
    orderSendMail(userLog, order);

    return res.render('order-final', { userLog });
  } 
  catch (err) {
    const msgError = `Error al crear el la orden ${err}`;
    logger.info.error(msgError);
    return res.status(404).json({ error: msgError });
  }
};

const viewOrderController = (req, res) => {
  return res.send('viewOrder');
}

const orderSendMail = async (userLog, order) => {
  let orderDetail = '';

  order.products.forEach(element => {
    orderDetail += `
      <li>Unidades: ${element.quantity}. Producto: ${element.name}. Codigo: ${element.code} </li>
    `;
  });

  const mailOptions = {
    from: serverConfig.MAILER_USER,
    to: `tomdic@gmail.com`,
    subject: `Nuevo pedido de: ${userLog.username}`,
    html: `
      <h3>Nuevo pedido!</h3>
      <p> Datos del cliente:</p>
      <ul>
      <li> Nombre: ${userLog.username}</li>
      <li> Email: ${userLog.email}</li>
      <li> Teléfono: ${userLog.phone}</li>
      <li> Direccion: ${userLog.address}</li>
      </ul>
      <p> Pedido:</p>
      <ul>
      ${orderDetail}
      </ul>
    `
  };
  const email = await sendMail(mailOptions);
  logger.info.error('orderSendMail:::' + email);
}

const auxWhatsApp = async (userLog, order) => {
  let orderDetail = '';

  order.products.forEach(element => {
    orderDetail +=
      `
        - UNIDADES: ${element.quantity}. PRODUCTO: ${element.name}. CODIGO: ${element.code}
      `;
  });

  const body =
    `Nuevo pedido!
    Datos del cliente:
    Nombre: ${userLog.username}
    ${userLog.email}
    Teléfono: ${userLog.phone}
    Direccion: ${userLog.address}
    Pedido:
    ${orderDetail}
    `;
  await sendWhatsApp(body, 'whatsapp:+', 'whatsapp:+');
}

export {
  createOrdenController,
  viewOrderController
}