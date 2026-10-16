import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ABOUT_ITEMS } from '../data/content';

export const About: React.FC = () => {
  return (
    <section id="about">
      <div className="section-container">
        <h2>About UNIQUE HOMES</h2>
        <div className="section-divider"></div>
        <div className="about-card-container">
          <p>
            UNIQUE HOMES is a premium fragrance brand dedicated to delivering long-lasting, 
            high-quality scents for your body and your space. We believe fragrance is more 
            than a smell — it’s an identity.
          </p>
          <ul className="about-list">
            {ABOUT_ITEMS.map((item, index) => (
              <li key={index}>
                <CheckCircle2 size={18} color="#D4AF37" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
