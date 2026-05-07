import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Reservation, { ReservationStatus, VIPStatus } from '../models/Reservation.ts';
import { analyzeSentiment } from '../services/ai.service.ts';
import { z } from 'zod';

const isConnected = () => mongoose.connection.readyState === 1;

const ReservationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  guests: z.number().min(1).max(20),
  date: z.string(),
  time: z.string(),
  specialRequests: z.string().optional(),
});

export const createReservation = async (req: Request, res: Response) => {
  try {
    const validatedData = ReservationSchema.parse(req.body);
    
    if (!isConnected()) {
      console.warn('Database not connected. Processing reservation in demo mode.');
      const analysis = await analyzeSentiment(validatedData.specialRequests || '');
      return res.status(201).json({
        ...validatedData,
        _id: 'demo-' + Date.now(),
        status: ReservationStatus.PENDING,
        vipStatus: analysis.priority || VIPStatus.NORMAL,
        sentimentAnalysis: analysis.analysis,
        message: 'Reservation received (Demo Mode - No Database)'
      });
    }

    // Check for duplicates (same email, date, time)
    const existing = await Reservation.findOne({
      email: validatedData.email,
      date: new Date(validatedData.date),
      time: validatedData.time
    });

    if (existing) {
      return res.status(409).json({ message: 'A reservation already exists for this time.' });
    }

    // AI Analysis for VIP/High-Priority
    const analysis = await analyzeSentiment(validatedData.specialRequests || '');
    
    const reservation = new Reservation({
      ...validatedData,
      date: new Date(validatedData.date),
      vipStatus: analysis.priority || VIPStatus.NORMAL,
      sentimentAnalysis: analysis.analysis
    });

    const saved = await reservation.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.issues });
    }
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(ReservationStatus).includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updated = await Reservation.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
