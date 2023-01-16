import mongoose from 'mongoose';
import {  hash, unhash } from '../utils/bcrypt.util.js';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  photo: { type: String, required: true },
  cart: { type: Array, required: true },
  admin: { type: Boolean, required: true }
}); 

userSchema.methods.encryptPassword = async password => {
  return await hash(password);
}

userSchema.methods.checkPassword = async function (password) {
  return await unhash(password, this.password);
}

const userModel = mongoose.model('User', userSchema, 'user');

//export default userModel;
export { userModel }