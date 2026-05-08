import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './src/app.ts';
import { seedDatabase } from './src/config/seed.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;

  // Database Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    if (MONGODB_URI) {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Connected to MongoDB');
        await seedDatabase();
    } else {
        console.warn('MONGODB_URI not found. Running in local/fallback mode.');
    }
  } catch (err) {
    console.error('Database connection error:', err);
  }

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

import express from 'express'; // Keep express import for production static serving
startServer();

