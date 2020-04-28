import express from 'express';
import routes from './routes';
import uploadConfigs from './config/upload';
import 'reflect-metadata'
import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfigs.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('Server Started listen 3333');
});
