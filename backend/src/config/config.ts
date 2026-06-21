import dotenv from 'dotenv';
import path from 'path';

// Load env variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const JWT_SECRET = process.env.JWT_SECRET || 'finance-flow-secret-key-2026';
export const PORT = Number(process.env.PORT) || 3000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
