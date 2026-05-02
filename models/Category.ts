import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  order: number;
  active: boolean;
  type: 'portfolio' | 'catalog' | 'building_type';
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: ['portfolio', 'catalog', 'building_type'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
