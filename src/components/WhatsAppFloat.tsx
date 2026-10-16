import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppGeneralLink } from '../data/products';

export const WhatsAppFloat: React.FC = () => {
  return (
    <a
      href={getWhatsAppGeneralLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle size={20} fill="#fff" color="#25D366" />
      <span>WhatsApp</span>
    </a>
  );
};
