import { FoodItem } from '../../types.ts';

const API_URL = '/api';

export const fetchMenu = async (category?: string, search?: string) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  
  const response = await fetch(`${API_URL}/menu?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch menu');
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/menu/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const createReservation = async (data: any) => {
  const response = await fetch(`${API_URL}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create reservation');
  }
  return response.json();
};

export const fetchGallery = async () => {
  const response = await fetch(`${API_URL}/gallery`);
  if (!response.ok) throw new Error('Failed to fetch gallery');
  return response.json();
};
