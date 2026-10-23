import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { getWhatsAppGeneralLink } from '../data/products';
import { useCart } from '../context/CartContext';

export const WhatsAppFloat: React.FC = () => {
  const { totalItems, setIsCartOpen, toastMessage } = useCart();

  return (
    <>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="cart-toast" role="status" aria-live="polite">
          <ShoppingBag size={16} color="#000" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Action Cluster */}
      <div className="floating-actions-cluster">
        {totalItems > 0 && (
          <button
            type="button"
            className="floating-cart-trigger"
            onClick={() => setIsCartOpen(true)}
            aria-label={`View shopping bag (${totalItems} items)`}
          >
            <ShoppingBag size={20} />
            <span className="floating-cart-badge">{totalItems}</span>
          </button>
        )}

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
      </div>
    </>
  );
};
