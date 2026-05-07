import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateChefNotes = async (itemName: string, description: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `As a professional Michelin-star chef, write a short, seductive, and elegant "Chef's Note" (max 30 words) for a new menu item called "${itemName}". The official description is: "${description}". Focus on the sensory experience and ingredients.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('AI Service Error (Chef Notes):', error);
    return 'Crafted with the finest seasonal ingredients for an unforgettable taste.';
  }
};

export const analyzeSentiment = async (specialRequests: string) => {
  try {
    if (!specialRequests || specialRequests.trim().length === 0) return 'Normal';
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Analyze the following restaurant reservation special request: "${specialRequests}". 
    Return a JSON object with two fields: 
    1. "priority": One of ["Normal", "High Priority", "VIP"].
    2. "analysis": A short explanation of why.
    Identify indicators of anniversary, proposal, allergies, celebrities, or high-profile events.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Attempt to parse JSON from AI response
    try {
      const cleaned = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleaned);
    } catch {
      return { priority: 'Normal', analysis: text };
    }
  } catch (error) {
    console.error('AI Service Error (Sentiment):', error);
    return { priority: 'Normal', analysis: 'Standard request' };
  }
};
