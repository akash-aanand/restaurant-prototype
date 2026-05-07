import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'taste-super-secret-key';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    // Check if any admin exists (restrict registration for safety in this demo)
    const adminCount = await User.countDocuments();
    if (adminCount > 0) {
      return res.status(403).json({ message: 'Admin already exists.' });
    }

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
