import mongoose, { Schema, Document } from 'mongoose';

export enum ReservationStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled'
}

export enum VIPStatus {
  NORMAL = 'Normal',
  VIP = 'VIP',
  HIGH_PRIORITY = 'High Priority'
}

export interface IReservation extends Document {
  fullName: string;
  email: string;
  guests: number;
  date: Date;
  time: string;
  specialRequests?: string;
  status: ReservationStatus;
  vipStatus: VIPStatus;
  sentimentAnalysis?: string;
}

const ReservationSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  guests: { type: Number, required: true, min: 1 },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  specialRequests: { type: String },
  status: { 
    type: String, 
    enum: Object.values(ReservationStatus), 
    default: ReservationStatus.PENDING 
  },
  vipStatus: { 
    type: String, 
    enum: Object.values(VIPStatus), 
    default: VIPStatus.NORMAL 
  },
  sentimentAnalysis: { type: String },
}, { timestamps: true });

// Prevent multiple reservations for same person on same day/time
ReservationSchema.index({ email: 1, date: 1, time: 1 }, { unique: true });

export default mongoose.model<IReservation>('Reservation', ReservationSchema);
