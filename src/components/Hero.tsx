import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { getWhatsAppGeneralLink } from '../data/products';

export const Hero: React.FC = () => {
  const scrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-badge">Curated Scents • Pure Luxury</div>
        <h1>Smell Luxurious. Live Unique.</h1>
        <p>Premium Perfumes &amp; Home Fragrances That Leave a Lasting Impression.</p>
        <div className="hero-buttons">
          <a href="#products" onClick={scrollToProducts} className="btn gold">
            <ShoppingBag size={18} />
            <span>Shop Collection</span>
          </a>
          <a 
            href={getWhatsAppGeneralLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn green"
          >
            <MessageCircle size={18} />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
