import { Product } from '../types';

export const WHATSAPP_NUMBER = '2348105425746';
export const WHATSAPP_DISPLAY = '+234 810 542 5746';

export function getWhatsAppOrderLink(productName: string, notes?: string): string {
  const message = notes 
    ? `Hi, I want to order ${productName} (${notes})` 
    : `Hi I want to order ${productName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppGeneralLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi I want to place an order')}`;
}

export const PRODUCTS: Product[] = [
  // Original 3 items from index.html
  {
    id: 'luxury-perfume',
    name: 'Luxury Perfume',
    category: 'perfumes',
    categoryLabel: 'Perfume',
    description: 'Long-lasting fragrance for elegance.',
    price: 5000,
    formattedPrice: '₦5,000',
    badge: 'Bestseller',
    volume: '100ml',
    scentNotes: ['Amber', 'Vanilla', 'Precious Woods'],
  },
  {
    id: 'home-diffuser',
    name: 'Home Diffuser',
    category: 'diffusers',
    categoryLabel: 'Diffuser',
    description: 'Fill your space with a signature scent.',
    price: 6000,
    formattedPrice: '₦6,000',
    badge: 'Signature',
    volume: '200ml with Reeds',
    scentNotes: ['Bergamot', 'Jasmine', 'Cedarwood'],
  },
  {
    id: 'body-spray',
    name: 'Body Spray',
    category: 'body-sprays',
    categoryLabel: 'Body Spray',
    description: 'Subtle, refreshing, luxurious.',
    price: 3000,
    formattedPrice: '₦3,000',
    badge: 'Popular',
    volume: '250ml',
    scentNotes: ['Fresh Aqua', 'Citrus Blossom', 'Musk'],
  },
  // Additional items fulfilling index.html: "Add more product placeholders up to 20 as needed" & meta tags
  {
    id: 'royal-oud-perfume',
    name: 'Royal Oud Perfume',
    category: 'perfumes',
    categoryLabel: 'Perfume',
    description: 'Deep, majestic Arabian oud with spiced amber undertones.',
    price: 8500,
    formattedPrice: '₦8,500',
    badge: 'Premium',
    volume: '100ml EDP',
    scentNotes: ['Agarwood (Oud)', 'Saffron', 'Smoked Amber'],
  },
  {
    id: 'vanilla-velvet-diffuser',
    name: 'Vanilla Velvet Reed Diffuser',
    category: 'diffusers',
    categoryLabel: 'Diffuser',
    description: 'Warm Madagascar vanilla and spun sugar for a comforting atmosphere.',
    price: 6500,
    formattedPrice: '₦6,500',
    badge: 'Relaxing',
    volume: '200ml',
    scentNotes: ['Madagascar Vanilla', 'Warm Cream', 'Sandalwood'],
  },
  {
    id: 'lavender-mist-air-freshener',
    name: 'Lavender Mist Air Freshener',
    category: 'air-fresheners',
    categoryLabel: 'Air Freshener',
    description: 'Pure French lavender mist that instantly clears and purifies rooms.',
    price: 3500,
    formattedPrice: '₦3,500',
    badge: 'Calming',
    volume: '300ml',
    scentNotes: ['French Lavender', 'Eucalyptus', 'White Florals'],
  },
  {
    id: 'amber-noir-body-spray',
    name: 'Amber Noir Body Spray',
    category: 'body-sprays',
    categoryLabel: 'Body Spray',
    description: 'An all-day sensual mist with dark bergamot and rich cedar.',
    price: 3200,
    formattedPrice: '₦3,200',
    badge: 'All Day Fresh',
    volume: '250ml',
    scentNotes: ['Dark Amber', 'Bergamot', 'Oakmoss'],
  },
  {
    id: 'crystal-musk-perfume',
    name: 'Crystal Musk Perfume',
    category: 'perfumes',
    categoryLabel: 'Perfume',
    description: 'Crisp white musk and floral dew designed to turn heads.',
    price: 5500,
    formattedPrice: '₦5,500',
    badge: 'Trending',
    volume: '100ml',
    scentNotes: ['White Musk', 'Lily of the Valley', 'Cashmere Wood'],
  },
  {
    id: 'citrus-bloom-air-freshener',
    name: 'Citrus Bloom Air Freshener',
    category: 'air-fresheners',
    categoryLabel: 'Air Freshener',
    description: 'Zesty orange blossom and lemon verbena for revitalizing interiors.',
    price: 3500,
    formattedPrice: '₦3,500',
    badge: 'Energizing',
    volume: '300ml',
    scentNotes: ['Sweet Orange', 'Verbena', 'Neroli'],
  }
];
