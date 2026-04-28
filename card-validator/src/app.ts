import express, { Application } from 'express';
import validateRouter from './routes/validates';
import { errorHandler } from './middleware/errorHandler';

export function createApp(): Application {
  const app = express();

  // Middleware
  app.use(express.json());

  // Routes
  app.use('/api/validate', validateRouter);

  // Health check
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: 'The requested resource does not exist',
    });
  });

  
  app.use(errorHandler);

  return app;
}