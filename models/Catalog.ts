import mongoose, { Document, Schema } from 'mongoose';

export interface ICatalog extends Document {
  title: string;
  slug: string;
  description?: string;
  price: number;
  oldPrice?: number;
  area: number;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  dimensions?: string;
  material: string; // Ссылка на название категории (Газобетон и т.д.)
  category: string; // Тип дома (Коттедж, Дача, Баня)
  images: string[];
  features: string[]; // Особенности (Гараж, Терраса, Балкон)
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CatalogSchema = new Schema<ICatalog>(
  {
    title: {
      type: String,
      required: [true, 'Название проекта обязательно'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug обязателен'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Цена обязательна'],
    },
    oldPrice: {
      type: Number,
    },
    area: {
      type: Number,
      required: [true, 'Площадь обязательна'],
    },
    floors: {
      type: Number,
      default: 1,
    },
    bedrooms: {
      type: Number,
      default: 1,
    },
    bathrooms: {
      type: Number,
      default: 1,
    },
    dimensions: {
      type: String,
      trim: true,
    },
    material: {
      type: String,
      required: [true, 'Материал обязателен'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Категория обязательна'],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Catalog || mongoose.model<ICatalog>('Catalog', CatalogSchema);
