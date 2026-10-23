import React from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight, 
  Plus, 
  Check, 
  ExternalLink,
  Store,
  Share2,
  Copy
} from 'lucide-react';
import { InstagramIcon, TikTokIcon } from './SocialIcons';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';
import { Product } from '../types';
import { 
  WHATSAPP_DISPLAY, 
  INSTAGRAM_HANDLE, 
  TIKTOK_HANDLE, 
  getWhatsAppOrderLink, 
  getWhatsAppGeneralLink 
} from '../data/products';

interface SocialBioHubProps {
  onSwitchToStore: () => void;
}

export const SocialBioHub: React.FC<SocialBioHubProps> = ({ onSwitchToStore }) => {
  const { addToCart, totalItems, setIsCartOpen } = useCart();
  const { products } = useCatalog();
  const [addedId, setAddedId] = React.useState<string | null>(null);
  const [copiedLink, setCopiedLink] = React.useState(false);

  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname + '#bio';
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }).catch(() => {
      // Fallback
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleAddProduct = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const featuredPicks = products.slice(0, 3);

  return (
    <div className="bio-hub-wrapper">
      <div className="bio-hub-container">
        {/* Brand Header */}
        <div className="bio-brand-header">
          <div className="bio-avatar-glow">
            <div className="bio-avatar">
              <Sparkles size={36} color="#D4AF37" />
            </div>
          </div>

          <div className="bio-title-row">
            <h1>UNIQUE HOMES</h1>
            <span className="bio-verified-badge" title="Official Brand Account">
              <Check size={14} />
            </span>
          </div>

          <p className="bio-tagline">Smell Luxurious. Live Unique.</p>
          <p className="bio-description">
            🇳🇬 Premium Perfumes, Reed Diffusers &amp; Luxury Body Sprays crafted for lasting impressions. Nationwide delivery across Nigeria.
          </p>

          {/* Social icons row */}
          <div className="bio-social-chips">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bio-social-pill"
              title="Instagram"
            >
              <InstagramIcon size={16} />
              <span>{INSTAGRAM_HANDLE}</span>
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bio-social-pill"
              title="TikTok"
            >
              <TikTokIcon size={16} />
              <span>{TIKTOK_HANDLE}</span>
            </a>
            <a 
              href={getWhatsAppGeneralLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bio-social-pill green-accent"
              title="WhatsApp"
            >
              <MessageCircle size={16} />
              <span>{WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>

        {/* View Cart Notification if items present */}
        {totalItems > 0 && (
          <button 
            type="button" 
            className="bio-cart-banner"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="bio-cart-banner-left">
              <ShoppingBag size={18} />
              <span>{totalItems} item{totalItems > 1 ? 's' : ''} in your bag</span>
            </div>
            <div className="bio-cart-banner-right">
              <span>View &amp; Checkout</span>
              <ArrowRight size={16} />
            </div>
          </button>
        )}

        {/* Primary Action Buttons */}
        <div className="bio-links-stack">
          <button 
            type="button" 
            className="bio-action-btn primary-gold"
            onClick={onSwitchToStore}
          >
            <Store size={20} />
            <div className="btn-text-block">
              <span className="btn-title">Explore Full Luxury Storefront</span>
              <span className="btn-sub">Browse all collections, notes &amp; reviews</span>
            </div>
            <ArrowRight size={18} className="btn-arrow" />
          </button>

          <a 
            href={getWhatsAppGeneralLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bio-action-btn whatsapp-highlight"
          >
            <MessageCircle size={22} />
            <div className="btn-text-block">
              <span className="btn-title">Chat Directly on WhatsApp</span>
              <span className="btn-sub">Quick orders, custom advice &amp; delivery info</span>
            </div>
            <ExternalLink size={18} className="btn-arrow" />
          </a>

          <button 
            type="button" 
            className="bio-action-btn neutral-dark"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            <div className="btn-text-block">
              <span className="btn-title">View Shopping Bag</span>
              <span className="btn-sub">
                {totalItems > 0 ? `${totalItems} items selected` : 'Your bag is currently empty'}
              </span>
            </div>
            <span className="bio-badge-count">{totalItems}</span>
          </button>

          <button 
            type="button" 
            className="bio-action-btn neutral-dark"
            onClick={handleCopyLink}
          >
            {copiedLink ? <Check size={20} color="#25D366" /> : <Copy size={20} color="#D4AF37" />}
            <div className="btn-text-block">
              <span className="btn-title">
                {copiedLink ? '✓ Link Copied to Clipboard!' : 'Copy Link for Instagram & TikTok Bio'}
              </span>
              <span className="btn-sub">
                {copiedLink ? 'Ready to paste into bio or send to client' : 'Click to copy direct website URL'}
              </span>
            </div>
            <Share2 size={18} className="btn-arrow" />
          </button>
        </div>

        {/* Fast Order / Viral Scents */}
        <div className="bio-featured-section">
          <div className="bio-section-title">
            <Sparkles size={16} color="#D4AF37" />
            <h3>Bestsellers &amp; Viral Scents</h3>
          </div>

          <div className="bio-product-cards">
            {featuredPicks.map((product: Product) => (
              <div key={product.id} className="bio-product-card">
                <div className="bio-product-img-wrapper">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="bio-product-img-placeholder">
                      <Sparkles size={24} color="#D4AF37" />
                    </div>
                  )}
                  {product.badge && (
                    <span className="bio-card-badge">{product.badge}</span>
                  )}
                </div>

                <div className="bio-product-details">
                  <div className="bio-product-head">
                    <h4>{product.name}</h4>
                    <span className="bio-product-price">{product.formattedPrice}</span>
                  </div>
                  <p className="bio-product-desc">{product.description}</p>
                  
                  <div className="bio-product-actions">
                    <button 
                      type="button" 
                      className={`bio-add-btn ${addedId === product.id ? 'added' : ''}`}
                      onClick={() => handleAddProduct(product)}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add to Bag
                        </>
                      )}
                    </button>

                    <a 
                      href={getWhatsAppOrderLink(product.name)}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bio-wa-btn"
                      title="Quick WhatsApp Order"
                    >
                      <MessageCircle size={15} /> Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Switcher */}
        <div className="bio-footer-nav">
          <button 
            type="button" 
            className="bio-switch-link"
            onClick={onSwitchToStore}
          >
            ← Switch to Standard Website Experience
          </button>
          <p className="bio-copyright">
            &copy; {new Date().getFullYear()} UNIQUE HOMES. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
