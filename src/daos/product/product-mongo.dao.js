import { mongoConnect } from "../../configs/mongo.config.js";
import { productModel } from "../../models/product.model.js";
import productMongoContainer from "../../containers/mongo/product-mongo.container.js";

class productMongoDao extends productMongoContainer {
  constructor() {    
    super(mongoConnect, productModel);
  };
};
 
export default productMongoDao;