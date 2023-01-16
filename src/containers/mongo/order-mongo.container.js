class orderMongoContainer {
  constructor(mongo, productModel, userModel, orderModel) {
    this.mongo = mongo;
    this.productModel = productModel;
    this.userModel = userModel;
    this.orderModel = orderModel;    
  } 

  async createOrder(ownerId) {
    let docUser = false;
    let orderProducts = [];
    docUser = await this.userModel.findOne({ _id: ownerId }, { __v: 0 });

    if (docUser) {
      orderProducts = docUser.cart;
      docUser.cart = [];

      let date = new Date();
      let orderNew = {
        timestamp: date,
        products: orderProducts,
        ownerId: ownerId
      };
      await docUser.save();
      const order = new this.orderModel(orderNew);
      this.mongo
        .then(_ => order.save())
        .then(document => console.log(document))
        .catch(err => console.log(`Error: ${err.message}`));

      return order;
    } 
    else {
        throw Error('Error al acceder al usuario');
    }
  }
} 

export default orderMongoContainer;