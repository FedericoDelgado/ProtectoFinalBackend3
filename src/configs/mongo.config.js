import mongoose from 'mongoose';
import { serverConfig } from './server.config.js';
import { logger } from '../utils/winston.util.js';
  
const uri = serverConfig.STORAGE == 'cloud' ? serverConfig.MONGO_ATLAS: serverConfig.MONGO_LOCAL;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

export const mongoConnect = mongoose.connect(uri, options);

/*
const mongoConnect = async () => {
  if (serverConfig.STORAGE == 'local') {
    const uri = serverConfig.MONGO_LOCAL;
    const options = { useNewUrlParser: true, useUnifiedTopology: true }
    await mongoose.connect(uri, options).then(
      ()  => { logger.info.info(`Conectado a mongoDB local`) },
      err => { logger.info.error(`Ocurrió un error al conectarse a la base de datos de mongodb: ${err}`) });
  }
  else if (serverConfig.STORAGE == 'cloud') {
    const uri = serverConfig.MONGO_ATLAS;      
    const options = { useNewUrlParser: true, useUnifiedTopology: true }
    await mongoose.connect(uri, options).then(
      ()  => { logger.info.info(`Conectado a MongoDB Cloud`) },
      err => { logger.info.error(`Ocurrió un error al conectarse a la base de datos de mongodb: ${err}`) }
    );
  }
  else{
    logger.info.error('ingresar parametro base datos');
  }
};

export { mongoConnect }
*/