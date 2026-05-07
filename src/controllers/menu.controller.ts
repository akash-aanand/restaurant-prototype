import { Request, Response } from 'express';
import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.ts';
import Category from '../models/Category.ts';
import { generateChefNotes } from '../services/ai.service.ts';
import { MENU_ITEMS } from '../../constants.tsx';

const isConnected = () => mongoose.connection.readyState === 1;

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { category, page = 1, limit = 10, search } = req.query;
    
    if (!isConnected()) {
      console.warn('Database not connected. Returning fallback menu items.');
      let filtered = [...MENU_ITEMS];
      if (category) {
        filtered = filtered.filter(item => item.category === category);
      }
      return res.json({
        items: filtered,
        pagination: {
          total: filtered.length,
          page: 1,
          pages: 1
        }
      });
    }

    const query: any = {};
    if (category) query.category = category;
    if (search) {
      query.$text = { $search: search as string };
    }

    const items = await MenuItem.find(query)
      .populate('category')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await MenuItem.countDocuments(query);

    res.json({
      items,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, categoryId, isPopular } = req.body;

    // Generate AI Chef Notes
    const chefNotes = await generateChefNotes(name, description);

    const newItem = new MenuItem({
      name,
      description,
      price,
      image,
      category: categoryId,
      isPopular,
      chefNotes
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    if (!isConnected()) {
      return res.json([
        { _id: 'starter', name: 'Starter', icon: 'Soup' },
        { _id: 'main', name: 'Main', icon: 'Utensils' },
        { _id: 'dessert', name: 'Dessert', icon: 'Cake' },
        { _id: 'wine', name: 'Wine', icon: 'Wine' },
      ]);
    }
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
