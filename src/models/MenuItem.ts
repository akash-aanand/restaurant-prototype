import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: mongoose.Types.ObjectId;
  isPopular: boolean;
  chefNotes?: string;
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  isPopular: { type: Boolean, default: false },
  chefNotes: { type: String },
}, { timestamps: true });

// Indexing for search and performance
MenuItemSchema.index({ name: 'text', description: 'text' });

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
