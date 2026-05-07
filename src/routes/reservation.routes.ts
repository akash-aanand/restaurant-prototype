import { Router } from 'express';
import { createReservation, getReservations, updateReservationStatus } from '../controllers/reservation.controller.ts';
import { authenticateAdmin } from '../middleware/auth.middleware.ts';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limit for creating reservations to prevent spam
const reservationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 reservations per window
  message: { message: 'Too many reservation attempts, please try again later.' }
});

router.post('/', reservationLimiter, createReservation);
router.get('/', authenticateAdmin, getReservations);
router.patch('/:id/status', authenticateAdmin, updateReservationStatus);

export default router;
