
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}