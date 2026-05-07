import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Gallery from '../models/Gallery.ts';
import { GALLERY_IMAGES } from '../../constants.tsx';

const isConnected = () => mongoose.connection.readyState === 1;

export const getGallery = async (req: Request, res: Response) => {
  try {
    if (!isConnected()) {
      return res.json(GALLERY_IMAGES);
    }
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const addToGallery = async (req: Request, res: Response) => {
  try {
    const { url, title, size } = req.body;
    const item = new Gallery({ url, title, size });
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
