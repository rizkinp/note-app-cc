import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
declare module 'express' {
  interface Request {
    userId?: number;
  }
}
const JWT_SECRET = process.env.JWT_SECRET as string;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = (decoded as { userId: number }).userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
