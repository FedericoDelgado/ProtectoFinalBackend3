import { mongoConnect } from "../../configs/mongo.config.js";
import { userModel } from "../../models/user.model.js";
import { productModel } from "../../models/product.model.js";
import { orderModel } from "../../models/order.model.js";
import orderMongoContainer from "../../containers/mongo/order-mongo.container.js";

class orderMongoDao extends orderMongoContainer {
  constructor() {
    super(mongoConnect, productModel, userModel, orderModel);
  };
};
 
export default orderMongoDao;

