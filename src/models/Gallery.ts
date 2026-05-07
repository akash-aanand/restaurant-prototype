import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  url: string;
  title: string;
  size: 'small' | 'medium' | 'large';
}

const GallerySchema: Schema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
}, { timestamps: true });

export default mongoose.model<IGallery>('Gallery', GallerySchema);
