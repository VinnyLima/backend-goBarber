import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfigs from '@config/upload';
import 'reflect-metadata';
import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfigs.directory));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Error interno no Servidor',
    });
  },
);

app.listen(3333, () => {
  console.log('Server Started listen 3333');
});
