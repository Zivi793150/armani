import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  type: 'callback' | 'consultation' | 'calculation' | 'order';
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['callback', 'consultation', 'calculation', 'order'],
      default: 'callback',
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'completed', 'cancelled'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
