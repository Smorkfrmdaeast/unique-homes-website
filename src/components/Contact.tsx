import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { getWhatsAppGeneralLink, WHATSAPP_DISPLAY } from '../data/products';

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
          <div>
            <div className="contact-phone-badge">
              <Phone size={18} />
              <span>Phone / WhatsApp: {WHATSAPP_DISPLAY}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
