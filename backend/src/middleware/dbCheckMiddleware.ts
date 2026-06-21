import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const dbCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // If connection is fully active, continue
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  const statusLabels: Record<number, string> = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  const status = mongoose.connection.readyState;
  const statusText = statusLabels[status] || 'Unknown';

  return res.status(503).json({
    status: 'error',
    statusCode: 503,
    errorType: 'DATABASE_DISCONNECTED',
    message: `Database Connection Error: The backend server is currently ${statusText} to MongoDB Atlas. Ensure process.env.MONGODB_URI is correctly configured in your environment settings and that Atlas allows access from your current IP.`
  });
};
