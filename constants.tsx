
import { FoodItem } from './types';

export const MENU_ITEMS: FoodItem[] = [
  {
    id: '1',
    category: 'main',
    name: 'Truffle Tagliatelle',
    description: 'Fresh hand-cut pasta served with Italian black summer truffles and aged parmesan cream.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=600&q=80'
  },
  {
    id: '2',
    category: 'main',
    name: 'Wagyu Ribeye',
    description: 'A5 Grade Wagyu beef served with smoked bone marrow butter and seasonal roasted root vegetables.',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?w=600&q=80'
  },
  {
    id: '3',
    category: 'main',
    name: 'Mediterranean Sea Bass',
    description: 'Pan-seared sea bass with saffron-infused lemon butter sauce and crispy leeks.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80'
  },
  {
    id: '4',
    category: 'dessert',
    name: 'Gold Leaf Chocolate Dome',
    description: 'Valrhona dark chocolate sphere with a salted caramel center and edible 24K gold flakes.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1511910849598-61e9ad7dc76b?w=600&q=80'
  }
];

export const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80', title: 'Signature Cocktails', size: 'large' },
  { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', title: 'Main Dining Room', size: 'medium' },
  { url: 'https://images.unsplash.com/photo-1550966841-3ee7adac1661?w=800&q=80', title: 'Chef Specials', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', title: 'Gourmet Platters', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80', title: 'Exclusive Wines', size: 'medium' },
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', title: 'Culinary Art', size: 'small' },
];
