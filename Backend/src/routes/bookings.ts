import express, { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get all bookings
router.get('/', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

// Update booking status
router.patch('/:id/status', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status?: string };

    if (!status) {
      res.status(400).json({ success: false, message: 'Status is required' });
      return;
    }

    const allowedStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status value' });
      return;
    }

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }

    res.status(200).json({ success: true, booking: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update booking status' });
  }
});

export default router;


