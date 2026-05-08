import serverless from 'serverless-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../../src/app.ts';

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI missing in Netlify environment. Using fallback mode.');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('Connected to MongoDB (Serverless)');
  } catch (err) {
    console.error('MongoDB connection error (Serverless):', err);
  }
};

const serverlessHandler = serverless(app);

export const handler: any = async (event: any, context: any) => {
  // Ensure DB is connected before handling the request
  await connectDB();
  return await serverlessHandler(event, context);
};
