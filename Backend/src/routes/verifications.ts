import express, { Request, Response } from 'express';
import { Caretakers } from '../models/Caretakers';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get caregiver applications (caretakers who applied)
router.get('/caregivers', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const caregivers = await Caretakers.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, caregivers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch caregiver applications' });
  }
});

export default router;


