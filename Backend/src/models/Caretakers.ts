import mongoose, { Schema, Document } from 'mongoose';

export interface ICaretakers extends Document {
  name: string;
  email: string;
  city: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const CaretakersSchema = new Schema<ICaretakers>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    city: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export const Caretakers = mongoose.model<ICaretakers>('Caretakers', CaretakersSchema);


