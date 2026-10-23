import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { buildWhatsAppCartOrderLink } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    customerDetails,
    setCustomerDetails,
  } = useCart();

  const [formErrors, setFormErrors] = useState<{ name?: boolean; phone?: boolean; address?: boolean }>({});
  const [showAddressForm, setShowAddressForm] = useState(false);

  if (!isCartOpen) return null;

  const handleInputChange = (field: keyof typeof customerDetails, value: string) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const orderUrl = buildWhatsAppCartOrderLink(items, customerDetails, totalPrice);

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <aside 
        className="cart-drawer" 
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping Cart Drawer"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} color="#D4AF37" />
            <h3>Your Shopping Bag</h3>
            <span className="cart-count-pill">{totalItems}</span>
          </div>
          <button 
            type="button" 
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="cart-empty-state">
            <ShoppingBag size={48} color="#444" />
            <h4>Your fragrance bag is empty</h4>
            <p>Discover our signature perfumes, diffusers, and luxury body sprays.</p>
            <button 
              type="button" 
              className="btn gold"
              onClick={() => {
                setIsCartOpen(false);
                const elem = document.querySelector('#products');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Browse Fragrances
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item-row">
                  <div className="cart-item-thumb">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="cart-item-thumb-fallback">
                        <ShoppingBag size={20} color="#D4AF37" />
                      </div>
                    )}
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-title-row">
                      <h4>{product.name}</h4>
                      <button 
                        type="button" 
                        className="cart-item-remove"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <span className="cart-item-meta">{product.categoryLabel} · {product.volume || 'Luxury'}</span>
                    <div className="cart-item-price">
                      ₦{(product.price * quantity).toLocaleString()}
                    </div>

                    <div className="cart-stepper">
                      <button 
                        type="button" 
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="quantity-num">{quantity}</span>
                      <button 
                        type="button" 
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Info Accordion */}
            <div className="cart-delivery-section">
              <button 
                type="button" 
                className="delivery-toggle-btn"
                onClick={() => setShowAddressForm(!showAddressForm)}
              >
                <span>Delivery &amp; Contact Details</span>
                <span className="toggle-indicator">
                  {showAddressForm ? '− Hide' : '+ Edit Details'}
                </span>
              </button>

              {showAddressForm && (
                <div className="delivery-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Chioma Adebayo"
                      value={customerDetails.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={formErrors.name ? 'input-error' : ''}
                    />
                    {formErrors.name && (
                      <span className="field-error">Please enter your name</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 08012345678"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={formErrors.phone ? 'input-error' : ''}
                    />
                    {formErrors.phone && (
                      <span className="field-error">Please provide a phone number</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Delivery Address *</label>
                    <input 
                      type="text" 
                      placeholder="Street address, Apartment / Estate"
                      value={customerDetails.deliveryAddress}
                      onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                      className={formErrors.address ? 'input-error' : ''}
                    />
                    {formErrors.address && (
                      <span className="field-error">Please enter delivery address</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>City &amp; State</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Lekki Phase 1, Lagos"
                      value={customerDetails.cityState}
                      onChange={(e) => handleInputChange('cityState', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Order Notes (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Gift packaging / Leave at gate"
                      value={customerDetails.notes || ''}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {Object.keys(formErrors).length > 0 && !showAddressForm && (
                <div className="form-alert">
                  <AlertCircle size={15} color="#e53e3e" />
                  <span>Please fill delivery details before checkout</span>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            <div className="cart-drawer-footer">
              <div className="cart-summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value tabular-nums">₦{totalPrice.toLocaleString()}</span>
              </div>
              <p className="delivery-note">
                ⚡ Orders are delivered promptly nationwide. Payment confirmed via WhatsApp.
              </p>

              <a 
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn green cart-checkout-btn"
              >
                <MessageCircle size={20} />
                <span>Checkout on WhatsApp</span>
                <ArrowRight size={18} />
              </a>

              <div className="cart-actions-bottom">
                <button 
                  type="button" 
                  className="cart-clear-link"
                  onClick={clearCart}
                >
                  Clear Bag
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};
