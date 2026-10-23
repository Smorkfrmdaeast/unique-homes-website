import React from 'react';
import { MessageCircle, Lock } from 'lucide-react';
import { InstagramIcon, TikTokIcon } from './SocialIcons';
import { 
  INSTAGRAM_URL, 
  TIKTOK_URL, 
  getWhatsAppGeneralLink, 
  WHATSAPP_DISPLAY, 
  INSTAGRAM_HANDLE, 
  TIKTOK_HANDLE 
} from '../data/products';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">UNIQUE HOMES</div>
          <p className="footer-tagline">Smell Luxurious. Live Unique.</p>
        </div>

        <div className="footer-social-links">
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
            className="footer-social-badge"
          >
            <InstagramIcon size={16} />
            <span>{INSTAGRAM_HANDLE}</span>
          </a>
          <a 
            href={TIKTOK_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="TikTok"
            className="footer-social-badge"
          >
            <TikTokIcon size={16} />
            <span>{TIKTOK_HANDLE}</span>
          </a>
          <a 
            href={getWhatsAppGeneralLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="WhatsApp"
            className="footer-social-badge green"
          >
            <MessageCircle size={16} />
            <span>{WHATSAPP_DISPLAY}</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} UNIQUE HOMES. All Rights Reserved.</p>
        {onOpenAdmin && (
          <button 
            type="button" 
            className="footer-admin-link"
            onClick={onOpenAdmin}
            title="Business Owner Admin Access"
          >
            <Lock size={13} />
            <span>Client Admin</span>
          </button>
        )}
      </div>
    </footer>
  );
};
