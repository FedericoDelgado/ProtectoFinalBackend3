class cartMongoContainer {
  constructor(mongo, cartModel, productModel, userModel) {
    this.mongo = mongo;
    this.cartModel = cartModel;
    this.productModel = productModel;
    this.userModel = userModel;
  } 
 
  async createCart() {
    let newCart = {
        timestamp: new Date(),
        products: []
    };

    const cart = new this.cartModel(newCart);
    
    this.mongo
      .then(_ => cart.save())
      .then(document => document._id.toString())
      .catch(err => console.log(`Error: ${err.message}`));
  }

  async getProductsById(idCart) {
    let docs = false
    docs = await this.cartModel.findOne({ _id: idCart }, { __v: 0 });
    if (docs) {
      return docs.products;
    }
    else {
      return false;
    }
  }

  async addProduct(idUser, idProduct) {
    let docUser = false;
    let docProduct = false;
    let isDuplicate = false;
    let newCart = [];

    docUser = await this.userModel.findOne({ _id: idUser }, { __v: 0 });   
    docProduct = await this.productModel.findOne({ _id: idProduct }, { __v: 0 });

    if (docUser && docProduct) {
      if (docUser.cart.length == 0) {
        docProduct.quantity++;
        newCart.push(docProduct);
      }
      else {
        newCart = docUser.cart;
        newCart.forEach(element => {
          if (element._id.toString() == docProduct._id.toString()) {
            element.quantity += 1;
            element.price += docProduct.price;
            isDuplicate = true;
          }
        });
        
        if (!isDuplicate) {
          docProduct.quantity++;
          newCart.push(docProduct);
        }
      }

      docUser.cart = [];
      await docUser.save();
      docUser.cart = newCart;
      return await docUser.save();
    }
    else {
      throw Error('Error al acceder al id del carrito / producto');
    }
  }  

  async deleteCartById(idCart) {
    this.mongo
      .then(_ => this.cartModel.deleteOne({
        _id: idCart
      }))
      .then(result => console.log(result))
      .catch(err => console.log(`Error: ${err.message}`))
  }  

  async deleteProductById(idUser, idProduct) {
    let docUser = false;
    let docProduct = false;
    
    docUser = await this.userModel.findOne({ _id: idUser }, { __v: 0 });
    docProduct = await this.productModel.findOne({ _id: idProduct }, { __v: 0 });

    if (docUser && docProduct) {
      let allProducts = docUser.cart;
      let products = [];

      allProducts.forEach(element => {
        if (element._id.toString() != docProduct._id.toString()) {
            products.push(element);
        }
      })        
      /*for (let i = 0; i <= allProducts.length - 1; i++) {
          if (allProducts[i]._id.toString() != docProduct._id.toString()) {
              products.push(allProducts[i]);
          }
      }*/
      docUser.cart = [];
      await docUser.save();
      docUser.cart = products;
      return await docUser.save();
    } 
    else {
      throw Error('Error al acceder al id del carrito / producto');
    }
  }  
}

export default cartMongoContainer;