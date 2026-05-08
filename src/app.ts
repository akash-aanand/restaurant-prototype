import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import menuRoutes from './routes/menu.routes.ts';
import reservationRoutes from './routes/reservation.routes.ts';
import authRoutes from './routes/auth.routes.ts';
import galleryRoutes from './routes/gallery.routes.ts';
import adminRoutes from './routes/admin.routes.ts';

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin', adminRoutes);

export default app;
