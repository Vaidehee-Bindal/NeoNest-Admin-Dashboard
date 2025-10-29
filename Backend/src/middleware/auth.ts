import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Admin, IAdmin } from '../models/Admin';

export interface AuthRequest extends Request {
  admin?: IAdmin;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!process.env.JWT_SECRET) {
      res.status(500).json({
        success: false,
        message: 'Server configuration error',
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      adminId: string;
    };

    // Get admin from database
    const admin = await Admin.findById(decoded.adminId).select('-password');

    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: Admin not found',
      });
      return;
    }

    if (!admin.isActive) {
      res.status(403).json({
        success: false,
        message: 'Forbidden: Admin account is deactivated',
      });
      return;
    }

    // Attach admin to request
    req.admin = admin;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid token',
      });
      return;
    }
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: Token expired',
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

