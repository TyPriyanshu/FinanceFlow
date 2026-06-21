import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';
import { logger } from '../utils/logger';

export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.warn(`Failed token authentication: No token provided under path ${req.url}`);
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      logger.warn(`Failed token verification: ${err.message}`);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export const authorizeRole = (roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!req.user || !roles.includes(req.user.role)) {
      logger.warn(`Unauthorized access attempt by ${req.user?.email || 'Unknown'} (Role: ${req.user?.role || 'None'}) to path ${req.originalUrl}`);
      return res.status(403).json({ message: 'Unauthorized access. Insufficient privileges.' });
    }
    next();
  };
};
