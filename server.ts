import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';

// Import Routes
import menuRoutes from './src/routes/menu.routes.ts';
import reservationRoutes from './src/routes/reservation.routes.ts';
import authRoutes from './src/routes/auth.routes.ts';
import galleryRoutes from './src/routes/gallery.routes.ts';
import adminRoutes from './src/routes/admin.routes.ts';
import { seedDatabase } from './src/config/seed.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Database Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    if (MONGODB_URI) {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
        });
        console.log('Connected to MongoDB');
        await seedDatabase();
    } else {
        console.warn('MONGODB_URI not found. Backend will run in fallback mode.');
    }
  } catch (err) {
    console.error('Database connection error:', err);
    console.warn('Backend will run in fallback mode.');
  }

  // Middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Vite needs this disabled for dev
  }));
  app.use(compression());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
  });

  app.use('/api/menu', menuRoutes);
  app.use('/api/reservations', reservationRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/gallery', galleryRoutes);
  app.use('/api/admin', adminRoutes);

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

startServer();
