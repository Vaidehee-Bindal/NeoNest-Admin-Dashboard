import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  motherId: string;
  motherName: string;
  organizationId: string;
  organizationName: string;
  caregiverId: string;
  caregiverName: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  date: Date;
  serviceType: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    motherId: { type: String, required: true },
    motherName: { type: String, required: true },
    organizationId: { type: String, required: true },
    organizationName: { type: String, required: true },
    caregiverId: { type: String, required: true },
    caregiverName: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    date: { type: Date, required: true },
    serviceType: { type: String, required: true },
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);


