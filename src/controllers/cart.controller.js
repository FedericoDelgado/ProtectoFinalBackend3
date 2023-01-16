import { logger } from '../utils/winston.util.js';
import { Storage } from "../daos/index.js";

const storage = Storage().cart;

const viewCart = (req, res) => {
  const userLog = req.user;
  return res.render('cart', { userLog });
}
 
const getAllProductsByIdCart = async(req, res) => {
  try {
    let idCart = req.params.id;
    let productsbyId = await storage.getProductsById(idCart);

    if (productsbyId.length == 0) {
      return res.json('El carrito se encuentra vacío');
    }
    else {
      return res.json(productsbyId);
    }
  }
  catch(err) {
    const msgError = `Codigo error: ${err.code} | Error al intentar acceder a un id de producto contenido en carrito: ${err}`;
    logger.info.error(msgError);
    return res.status(404).json({ error: msgError });
  }
};

const createCart = async(req, res) => {
  try {
    const id = await storage.createCart();
    logger.info.info('carrito creado satisfactoriamente');
    return res.redirect('/api/product');
  }
  catch(err) {
    const msgError = `Codigo error: ${err.code} | Error al crear el carrito ${err}`;    
    logger.info.error(msgError);
    return res.status(404).json({ error: msgError });
  }
};

const addProductToCart = async(req, res) => {
  try {
    let idUser = req.body.idUser;
    let idProduct = req.body.idProduct;
    
    const response = await storage.addProduct(idUser, idProduct);
    return res.redirect('/api/product');
  }
  catch(err) {
    const msgError = `Codigo error: ${err.code} | Error al agregar un producto: ${err}`; 
    logger.info.error(msgError);           
    return res.status(404).json({ error: msgError });
  }
};

const deleteCartById = async(req, res) => {
  try {
    const idCart = req.params.id;

    await storage.deleteCartById(idCart);
    
    logger.info.info('Se eliminó el carrito de forma correcta');  
    return res.json('Se eliminó el carrito de forma correcta');
  }
  catch(err) {
    const msgError = `Codigo error: ${err.code} | Error al eliminar el carrito ${err}`;  
    logger.info.error(msgError);          
    return res.status(404).json({ error: msgError });
  }
};

const deleteProductById = async(req, res) => {
  try {
    let idUser = req.body.idUser;
    let idProduct = req.body.idProduct;
    
    await storage.deleteProductById(idUser, idProduct);
    return res.redirect('/api/cart');
  }
  catch(err) {
    const msgError = `Error al eliminar un producto específico de un carrito ${err}`; 
    logger.info.error(msgError);            
    
    return res.render('error-view', {msgError});
  }
};

export {
  getAllProductsByIdCart,
  createCart,
  addProductToCart,
  deleteCartById,
  deleteProductById,
  viewCart }