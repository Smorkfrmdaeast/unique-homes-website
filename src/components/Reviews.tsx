import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/content';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews">
      <div className="section-container">
        <h2>Customer Reviews</h2>
        <div className="section-divider"></div>
        <p className="section-subtext">
          Read what our cherished customers say about our signature scents and service.
        </p>

        <div className="reviews-grid">
          {REVIEWS.map((review) => (
            <div key={review.id} className="review-card">
              <div>
                <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill="#D4AF37" 
                      color="#D4AF37" 
                      style={{ display: 'inline-block', marginRight: '3px' }} 
                    />
                  ))}
                </div>
                <p className="review-comment">"{review.comment}"</p>
              </div>

              <div className="review-author-row">
                <span className="review-author">{review.author}</span>
                {review.verified && (
                  <span className="review-verified">
                    <CheckCircle size={14} /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
