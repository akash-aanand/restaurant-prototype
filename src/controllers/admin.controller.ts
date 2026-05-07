import { Request, Response } from 'express';
import { uploadToCloudinary } from '../services/cloudinary.service.ts';
import multer from 'multer';

const storage = multer.memoryStorage();
export const uploadMiddleware = multer({ storage }).single('file');

export const handleUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { folder = 'taste' } = req.body;
    const result: any = await uploadToCloudinary(req.file.buffer, folder);

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format
    });
  } catch (err) {
    res.status(500).json({ message: 'Cloudinary upload failed', error: (err as Error).message });
  }
};
