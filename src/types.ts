export interface Product {
  id: string;
  name: string;
  category: 'perfumes' | 'diffusers' | 'body-sprays' | 'air-fresheners';
  categoryLabel: string;
  description: string;
  price: number;
  formattedPrice: string;
  badge?: string;
  volume?: string;
  scentNotes?: string[];
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerOrderDetails {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  cityState: string;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  verified?: boolean;
  date?: string;
}

export interface Feature {
  id: string;
  title: string;
  description?: string;
}
