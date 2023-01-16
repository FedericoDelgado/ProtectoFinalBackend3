class productMongoContainer {
  constructor(mongo, productModel) {
    this.mongo = mongo;
    this.productModel = productModel;
  } 

  async getAll() {
    try {
      let docs = false;
      docs = await this.productModel.find();
      if (docs) {
        return docs;
      }
      else {
        return false;
      }
    }
    catch (error) {
      throw Error('Error en getAll()');
    }
  }

  async getById(id) {
    try {
      let doc = false;
      doc = await this.productModel.findOne({ _id: id }, { __v: 0 });
      
      if (doc) {
        return doc;
      }
      else {
        return false;
      }
    }
    catch (error) {
      throw Error('Error Producto no encontrado');
    }
  }

  async deleteById(id) {
    this.mongo
      .then(_ => this.productModel.deleteOne({
          _id: id
      }))
      .catch(err => console.log(`Error: ${err.message}`));
  }

  async save(product) {
    product = new this.productModel(product);
    this.mongo
      .then(_ => product.save())
      .then(document => document)
      .catch(err => console.log(`Error: ${err.message}`));
  }

  async updateById(id, date, name, code, description, price, stock, thumbnail) {
    this.mongo
      .then(_ => this.productModel.findOne({ _id: id }, { __v: 0 }))
      .then(product => {
        product.timestamp = date;
        product.name = name;
        product.description = description;
        product.code = code; 
        product.price = price;
        product.stock = stock;
        product.thumbnail = thumbnail;

        return product.save();
      })
      .catch(err => console.log(`Error: ${err.message}`))
  }
} 

export default productMongoContainer;