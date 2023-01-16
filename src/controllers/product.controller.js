import { logger } from '../utils/winston.util.js';
import { Storage }  from "../daos/index.js";

const storage = Storage().product;

const getAllProducts = async(req, res) => {
  try {
    const userLog = req.user;
    const allProducts = await storage.getAll();
    return res.render('product', { allProducts, userLog });

    return res.json(allProducts);
  }
  catch(err) {
    const msgError = `Error al obtener todos los productos${err}`; 
    logger.info.error(msgError);      
    return res.status(404).json({ error: msgError });
  }
}

const getProductById = async(req, res) => {
  let msgError = '';
  try {
    let productbyId = await storage.getById(req.params.id);

    if (!productbyId) {
      msgError = 'Error producto no encontrado'; 
      logger.info.error(msgError); 
      return res.status(404).json({ error: msgError });
    }
    else {
      return res.render('product-by-id', { productById });
    }
  }
  catch (err) {
    msgError = `Codigo error: ${err.code} | Error al obtener el producto por id: ${err}`; 
    logger.info.error(msgError); 
    return res.status(404).json({ error: msgError });
  }
}

const addProduct = async(req, res) => {
  const userLog = req.user;
  if (userLog.admin) {
    try {
      const date = new Date().toDateString();
      const name = req.body.name;
      const code = req.body.code;
      const description = req.body.description;
      const price = Number(req.body.price);
      const stock = Number(req.body.stock);
      const thumbnail = req.body.thumbnail;
      
      const newProduct = {
        timestamp: date,
        name: `${name}`,
        code: `${code}`,
        description: `${description}`,
        price: price,
        stock: stock,
        thumbnail: `${thumbnail}`
      };
   
      await storage.save(newProduct);

      logger.info.info(`producto creado`);   
      return res.redirect(`/api/product`);      
    }
    catch(error) {
      const msgError = `Error al crear producto: ${error}`; 
      logger.info.error(msgError);     
      return res.status(404).json({ error: msgError });
    }
  }  
  else {
    return res.status(404).json({
      error: `Ruta no permitida, no es usuario con perfil administrador.`
    });
  }  
}

const updateProductById = async(req, res) => {
  const userLog = req.user;
  if (userLog.admin) {  
    try {
      const idProduct = req.params.id;
      const date = new Date().toDateString();
      const name = req.body.name;
      const code = Number(req.body.code);
      const description = req.body.description;
      const price = Number(req.body.price);
      const stock = Number(req.body.stock);    
      const thumbnail = req.body.thumbnail;
      
      await storage.updateById(idProduct, date, name, code, description, price, stock, thumbnail);

      logger.info.info(`ctualizó el producto: ${idProduct}`);   
      return res.redirect('/api/product');  
    }
    catch (err) {
      const msgError = `Codigo error: ${err.code} | Error al actualizar un producto ${err}`; 
      logger.info.error(msgError); 
      return res.status(404).json({ error: msgError });
    }  
  }  
  else {
    return res.status(404).json({
      error: `Ruta no permitida, no es usuario con perfil administrador.`
    });
  }   
}

const deleteProductById = async(req, res) => {
  try {
    const id = req.params.id;
    await storage.deleteById(id);
    return res.json(`Se eliminó de forma correcta el Id: ${id}`);
  }
  catch(err) {
    const msgError = `Codigo error: ${err.code} | Error al borrar un producto por id ${err}`; 
    logger.info.error(msgError); 
    return res.status(404).json({ error: msgError });
  }
}

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById
}