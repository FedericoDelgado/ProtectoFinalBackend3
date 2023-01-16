import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  products: { type: Array, required: true },
  ownerId: { type: Object, require: true }
});
 
export const orderModel = mongoose.model('Order', orderSchema, 'order');