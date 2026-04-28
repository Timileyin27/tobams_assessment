import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err.message);

  const response: ErrorResponse = {
    error: 'Internal Server Error',
    message: 'Something went wrong processing your request',
  };

  res.status(500).json(response);
}