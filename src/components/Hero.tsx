import React from 'react';
import { ShoppingBag, MessageCircle, Smartphone } from 'lucide-react';
import { InstagramIcon, TikTokIcon } from './SocialIcons';
import { getWhatsAppGeneralLink, HERO_IMAGE_URL, INSTAGRAM_URL, TIKTOK_URL } from '../data/products';

interface HeroProps {
  onOpenBioMode?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBioMode }) => {
  const scrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.92)), url(${HERO_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-top-cluster">
          <div className="hero-badge">Curated Scents • Pure Luxury</div>
          {onOpenBioMode && (
            <button 
              type="button" 
              className="hero-bio-chip"
              onClick={onOpenBioMode}
              title="Optimized for Instagram and TikTok users"
            >
              <Smartphone size={14} />
              <span>Social Bio Mode</span>
            </button>
          )}
        </div>

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

        {/* Social channels bar */}
        <div className="hero-social-strip">
          <span className="social-strip-label">Connect with us:</span>
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hero-social-link"
          >
            <InstagramIcon size={16} />
            <span>Instagram</span>
          </a>
          <span className="strip-dot">·</span>
          <a 
            href={TIKTOK_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hero-social-link"
          >
            <TikTokIcon size={16} />
            <span>TikTok</span>
          </a>
          <span className="strip-dot">·</span>
          <a 
            href={getWhatsAppGeneralLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hero-social-link green"
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
