import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  products: { type: Array, required: true },
  owner: { type: Object, require: true }
});

const cartModel = mongoose.model('Cart', cartSchema, 'cart');
 
export { cartModel }