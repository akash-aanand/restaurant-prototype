
import { FoodItem, Category, NavigationLink } from './types';

export const NAV_LINKS: NavigationLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservation', href: '#reserve' },
];

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'burger', name: 'Burger', icon: '🍔' },
  { id: 'icecream', name: 'Dessert', icon: '🍦' },
  { id: 'coffee', name: 'Drinks', icon: '☕' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
];

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Crab Ramen',
    description: 'Spicy seafood broth with fresh crab',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=600&fit=crop',
    category: 'sushi'
  },
  {
    id: '2',
    name: 'Signature Wagyu',
    description: 'Triple-stacked premium wagyu beef',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop',
    category: 'burger'
  },
  {
    id: '3',
    name: 'Matcha Bliss',
    description: 'Traditional Kyoto matcha ice cream',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1505394033223-431a04d2b585?w=600&h=600&fit=crop',
    category: 'icecream'
  },
  {
    id: '4',
    name: 'Cold Brew Nitro',
    description: 'Velvety smooth 24-hour steep',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=600&fit=crop',
    category: 'coffee'
  },
  {
    id: '5',
    name: 'Spicy Penne',
    description: 'Italian pasta with arabiata sauce',
    price: 15.89,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=600&h=600&fit=crop',
    category: 'burger'
  },
  {
    id: '6',
    name: 'Salmon Nigiri',
    description: 'Fresh Atlantic salmon with wasabi',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600&h=600&fit=crop',
    category: 'sushi'
  }
];

export const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', title: 'Our Main Dining Hall', size: 'large' },
  { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', title: 'Signature Cocktails', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1550966841-3ee7adac1661?w=600&q=80', title: 'Kitchen Mastery', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80', title: 'Private Dining Room', size: 'medium' },
  { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80', title: 'Alfresco Seating', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', title: 'Daily Fresh Bakes', size: 'medium' },
];
