import { Product, CartItem, CustomerOrderDetails } from '../types';
import heroImage from '../assets/images/hero_luxury_perfumes_1792161926993.jpg';
import perfumeImage from '../assets/images/product_luxury_perfume_1792161927615.jpg';
import diffuserImage from '../assets/images/product_home_diffuser_1792161927923.jpg';
import bodySprayImage from '../assets/images/product_body_spray_1792161927821.jpg';

export const WHATSAPP_NUMBER = '2348105425746';
export const WHATSAPP_DISPLAY = '+234 810 542 5746';
export const INSTAGRAM_HANDLE = '@uniquehomes_fragrance';
export const INSTAGRAM_URL = 'https://instagram.com';
export const TIKTOK_HANDLE = '@uniquehomes_fragrance';
export const TIKTOK_URL = 'https://tiktok.com';

export const HERO_IMAGE_URL = heroImage;

export function getWhatsAppOrderLink(productName: string, notes?: string): string {
  const message = notes 
    ? `Hi, I want to order ${productName} (${notes})` 
    : `Hi I want to order ${productName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppGeneralLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi I want to place an order')}`;
}

export function buildWhatsAppCartOrderLink(
  items: CartItem[], 
  customer: CustomerOrderDetails,
  totalPrice: number
): string {
  const customerName = customer.fullName.trim() || 'To be shared in chat';
  const customerPhone = customer.phone.trim() || 'To be shared in chat';
  const customerAddress = customer.deliveryAddress.trim() || 'To be shared in chat';
  const customerCity = customer.cityState.trim() || 'Nigeria';

  const itemList = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} (${item.product.volume || 'Std'}) x${item.quantity} — ₦${(
          item.product.price * item.quantity
        ).toLocaleString()}`
    )
    .join('\n');

  const formattedMessage = `✨ *NEW ORDER — UNIQUE HOMES* ✨

👤 *Customer Details:*
• *Name:* ${customerName}
• *Phone:* ${customerPhone}
• *Address:* ${customerAddress}
• *City / State:* ${customerCity}${
    customer.notes ? `\n• *Delivery Note:* ${customer.notes}` : ''
  }

🛍️ *Items Ordered:*
${itemList}

💰 *Total Amount:* ₦${totalPrice.toLocaleString()}

Please confirm stock availability and share payment account details. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;
}

export const PRODUCTS: Product[] = [
  // Original 3 items from index.html with real bundled studio photography
  {
    id: 'luxury-perfume',
    name: 'Luxury Perfume',
    category: 'perfumes',
    categoryLabel: 'Perfume',
    description: 'Long-lasting fragrance for elegance and timeless charisma.',
    price: 5000,
    formattedPrice: '₦5,000',
    badge: 'Bestseller',
    volume: '100ml EDP',
    scentNotes: ['Amber', 'Vanilla', 'Precious Woods'],
    imageUrl: perfumeImage,
  },
  {
    id: 'home-diffuser',
    name: 'Home Diffuser',
    category: 'diffusers',
    categoryLabel: 'Diffuser',
    description: 'Fill your space with a signature scent and opulent aura.',
    price: 6000,
    formattedPrice: '₦6,000',
    badge: 'Signature',
    volume: '200ml with Reeds',
    scentNotes: ['Bergamot', 'Jasmine', 'Cedarwood'],
    imageUrl: diffuserImage,
  },
  {
    id: 'body-spray',
    name: 'Body Spray',
    category: 'body-sprays',
    categoryLabel: 'Body Spray',
    description: 'Subtle, refreshing, luxurious all-day mist.',
    price: 3000,
    formattedPrice: '₦3,000',
    badge: 'Popular',
    volume: '250ml',
    scentNotes: ['Fresh Aqua', 'Citrus Blossom', 'Musk'],
    imageUrl: bodySprayImage,
  },
  // Additional items fulfilling index.html placeholders and catalog richness
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
    imageUrl: perfumeImage,
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
    imageUrl: diffuserImage,
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
    imageUrl: bodySprayImage,
  },
  {
    id: 'amber-noir-body-spray',
    name: 'Amber Noir Body Spray',
    category: 'body-sprays',
    categoryLabel: 'Body Spray',
    description: 'An all-day sensual mist with dark bergamot and rich cedar.',
    price: 3200,
    formattedPrice: '₦3,200',
    badge: 'Viral TikTok',
    volume: '250ml',
    scentNotes: ['Dark Amber', 'Bergamot', 'Oakmoss'],
    imageUrl: bodySprayImage,
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
    imageUrl: perfumeImage,
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
    imageUrl: diffuserImage,
  }
];
