import bcrypt from 'bcryptjs';

//async: genSalt, hash, compare
const salt = bcrypt.genSaltSync(10);

const hash = async (password) => {
  return bcrypt.hashSync(password, salt);
};

const unhash = async (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
 
export { hash, unhash }
