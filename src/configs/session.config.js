import MongoStore from 'connect-mongo';
import { serverConfig } from './server.config.js';
 
export const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: (serverConfig.STORAGE == 'local') ? serverConfig.MONGO_LOCAL : serverConfig.MONGO_ATLAS,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  secret: serverConfig.SESSION_KEY,
  rolling: true,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: Number(serverConfig.SESSION_TIME),
  }  
}