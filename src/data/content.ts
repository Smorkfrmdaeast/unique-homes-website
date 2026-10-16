import { Review, Feature } from '../types';

export const WHY_CHOOSE_US: Feature[] = [
  {
    id: 'original',
    title: '100% Original Fragrances',
    description: 'Directly sourced authentic perfume concentrates and oils guaranteed.'
  },
  {
    id: 'long-lasting',
    title: 'Long-Lasting Performance',
    description: 'Engineered high-potency formulations that project and linger for 12+ hours.'
  },
  {
    id: 'fast-delivery',
    title: 'Fast & Reliable Delivery',
    description: 'Prompt dispatch and secure delivery directly to your doorstep.'
  },
  {
    id: 'affordable-luxury',
    title: 'Affordable Luxury Pricing',
    description: 'Designer-grade scent profiles without the exorbitant designer markup.'
  },
  {
    id: 'satisfaction',
    title: 'Customer Satisfaction Guaranteed',
    description: 'Dedicated personalized customer support on WhatsApp for every order.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Jane Elliott',
    rating: 5,
    comment: 'Amazing fragrance, lasts all day!',
    verified: true,
    date: 'Recent verified order'
  },
  {
    id: '2',
    author: 'John Eke',
    rating: 5,
    comment: 'Elegant scents, very satisfied.',
    verified: true,
    date: 'Recent verified order'
  },
  {
    id: '3',
    author: 'Amara N.',
    rating: 5,
    comment: 'The Home Diffuser transformed my living room completely. Everyone who walks in asks what smells so good!',
    verified: true,
    date: 'Recent verified order'
  },
  {
    id: '4',
    author: 'Tunde O.',
    rating: 5,
    comment: 'Ordered via WhatsApp, response was super fast and delivery arrived on time. Highly recommended!',
    verified: true,
    date: 'Recent verified order'
  }
];

export const ABOUT_ITEMS = [
  'Authentic Products',
  'Long-lasting Scents',
  'Affordable Luxury',
  'Trusted by Customers'
];
