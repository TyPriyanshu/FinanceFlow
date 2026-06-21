import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import authRoutes from './routes/authRoutes';
import recordRoutes from './routes/recordRoutes';
import { dbCheckMiddleware } from './middleware/dbCheckMiddleware';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app = express();

// Set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: false, // Turn off CSP for dev server iFrame safety
}));

// Compress all responses
app.use(compression());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: '*', // For development / rendering fluidity
  credentials: true
}));

// Global request logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Fail-fast DB Connection Check Middleware
app.use('/api', dbCheckMiddleware);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);

// Centralized Error Handler
app.use(errorHandler);

export default app;
