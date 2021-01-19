var  cors = require ('cors');
import 'reflect-metadata';
var express = require('express');
import './database/connect';
import routes from './routes';



const app = express();
//rota conjunto de tudo
//recurdso é usuario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());
app.use(routes);
app.listen(3333, () => console.log('🔥 Server Started at httpp://localhost:3333 🔥'));




