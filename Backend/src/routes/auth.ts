import express, { Request, Response } from 'express';
import { sign, verify, type Secret, type JwtPayload } from 'jsonwebtoken';
import { Admin } from '../models/Admin';

const router = express.Router();

// Generate JWT token
const generateToken = (adminId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const secret = process.env.JWT_SECRET as Secret;
  const parseExpires = (val?: string): number => {
    if (!val) return 60 * 60 * 24 * 7; // 7 days
    const numOnly = /^\d+$/;
    if (numOnly.test(val)) return parseInt(val, 10);
    const m = val.match(/^(\d+)([smhd])$/);
    if (!m) return 60 * 60 * 24 * 7;
    const amount = parseInt(m[1], 10);
    const unit = m[2];
    switch (unit) {
      case 's':
        return amount;
      case 'm':
        return amount * 60;
      case 'h':
        return amount * 60 * 60;
      case 'd':
        return amount * 60 * 60 * 24;
      default:
        return 60 * 60 * 24 * 7;
    }
  };
  const expiresIn = parseExpires(process.env.JWT_EXPIRES_IN);
  return sign({ adminId }, secret, { expiresIn });
};

// Login route
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
      return;
    }

    // Find admin with password field
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    if (!admin.isActive) {
      res.status(403).json({
        success: false,
        message: 'Your account has been deactivated',
      });
      return;
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    // Generate token
    const token = generateToken(admin.id);

    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Verify token route
router.get('/verify', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No token provided',
      });
      return;
    }

    const token = authHeader.substring(7);

    if (!process.env.JWT_SECRET) {
      res.status(500).json({
        success: false,
        message: 'Server configuration error',
      });
      return;
    }

    const decoded = verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload & { adminId: string };

    const admin = await Admin.findById(decoded.adminId).select('-password');

    if (!admin || !admin.isActive) {
      res.status(401).json({
        success: false,
        message: 'Invalid or inactive admin',
      });
      return;
    }

    res.status(200).json({
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;

