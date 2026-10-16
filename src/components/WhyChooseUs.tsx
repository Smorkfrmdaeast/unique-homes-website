import React from 'react';
import { ShieldCheck, Clock, Truck, DollarSign, Award } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'original':
        return <ShieldCheck size={28} />;
      case 'long-lasting':
        return <Clock size={28} />;
      case 'fast-delivery':
        return <Truck size={28} />;
      case 'affordable-luxury':
        return <DollarSign size={28} />;
      case 'satisfaction':
        return <Award size={28} />;
      default:
        return <ShieldCheck size={28} />;
    }
  };

  return (
    <section id="why">
      <div className="section-container">
        <h2>Why Choose UNIQUE HOMES</h2>
        <div className="section-divider"></div>
        <div className="icon-cards">
          {WHY_CHOOSE_US.map((item) => (
            <div key={item.id} className="icon-card">
              <div className="card-icon-wrapper">
                {getFeatureIcon(item.id)}
              </div>
              <div className="card-title">{item.title}</div>
              {item.description && (
                <p className="card-desc">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
