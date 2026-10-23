import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { InstagramIcon, TikTokIcon } from './SocialIcons';
import { 
  getWhatsAppGeneralLink, 
  WHATSAPP_DISPLAY, 
  INSTAGRAM_HANDLE, 
  INSTAGRAM_URL, 
  TIKTOK_HANDLE, 
  TIKTOK_URL 
} from '../data/products';

export const Contact: React.FC = () => {
  return (
    <section id="contact">
      <div className="section-container">
        <h2>Contact Us</h2>
        <div className="section-divider"></div>
        <div className="contact-card">
          <p>
            Ready to indulge in a fragrance that sets you apart? Chat directly with us on WhatsApp to place your order, ask questions about notes, or get personalized recommendations.
          </p>

          <a
            href={getWhatsAppGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn green contact-btn"
          >
            <MessageCircle size={22} />
            <span>Order on WhatsApp</span>
          </a>

          <div className="contact-info-stack">
            <div className="contact-phone-badge">
              <Phone size={18} />
              <span>Phone / WhatsApp: {WHATSAPP_DISPLAY}</span>
            </div>

            {/* Social channels */}
            <div className="contact-social-row">
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-item"
              >
                <InstagramIcon size={18} />
                <span>{INSTAGRAM_HANDLE}</span>
              </a>
              <a 
                href={TIKTOK_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-item"
              >
                <TikTokIcon size={18} />
                <span>{TIKTOK_HANDLE}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
