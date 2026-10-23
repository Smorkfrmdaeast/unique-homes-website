import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ShoppingBag, Smartphone, Share2, Check } from 'lucide-react';
import { InstagramIcon, TikTokIcon } from './SocialIcons';
import { useCart } from '../context/CartContext';
import { INSTAGRAM_URL, TIKTOK_URL } from '../data/products';

interface NavbarProps {
  currentView: 'store' | 'bio';
  onToggleView: (view: 'store' | 'bio') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onToggleView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }).catch(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentView !== 'store') {
      onToggleView('store');
      setTimeout(() => {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-left">
        <a 
          href="#hero" 
          className="logo" 
          onClick={(e) => scrollToSection(e, '#hero')}
        >
          <Sparkles className="logo-icon" size={20} />
          <span>UNIQUE HOMES</span>
        </a>
      </div>

      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <li>
          <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')}>Home</a>
        </li>
        <li>
          <a href="#about" onClick={(e) => scrollToSection(e, '#about')}>About</a>
        </li>
        <li>
          <a href="#products" onClick={(e) => scrollToSection(e, '#products')}>Products</a>
        </li>
        <li>
          <a href="#why" onClick={(e) => scrollToSection(e, '#why')}>Why Us</a>
        </li>
        <li>
          <a href="#reviews" onClick={(e) => scrollToSection(e, '#reviews')}>Reviews</a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>Contact</a>
        </li>

        <li className="mobile-only-link">
          <button 
            type="button" 
            className="nav-bio-toggle-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onToggleView(currentView === 'store' ? 'bio' : 'store');
            }}
          >
            <Smartphone size={16} />
            <span>{currentView === 'store' ? 'Social Bio View (IG / TikTok)' : 'Storefront View'}</span>
          </button>
        </li>
      </ul>

      {/* Right Action Icons: Socials, Bio Toggle & Cart */}
      <div className="nav-actions">
        <div className="nav-social-icons">
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
            className="nav-icon-link"
          >
            <InstagramIcon size={16} />
          </a>
          <a 
            href={TIKTOK_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="TikTok"
            className="nav-icon-link"
          >
            <TikTokIcon size={16} />
          </a>
        </div>

        {/* View Switcher button */}
        <button 
          type="button" 
          className="nav-bio-pill-btn"
          onClick={() => onToggleView(currentView === 'store' ? 'bio' : 'store')}
          title="Switch view for Instagram/TikTok visitors"
        >
          <Smartphone size={15} />
          <span className="bio-pill-text">
            {currentView === 'store' ? 'Bio Mode' : 'Store Mode'}
          </span>
        </button>

        {/* Cart Trigger */}
        <button 
          type="button" 
          className="nav-cart-btn"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open shopping bag"
        >
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span className="cart-badge-indicator">{totalItems}</span>
          )}
        </button>

        {/* Share / Copy Link Trigger */}
        <button 
          type="button" 
          className="nav-share-btn"
          onClick={handleCopyLink}
          title={copiedLink ? "Link copied!" : "Copy website link to send to client"}
          aria-label="Copy website link"
        >
          {copiedLink ? <Check size={18} color="#25D366" /> : <Share2 size={18} />}
        </button>

        <button 
          type="button" 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};
