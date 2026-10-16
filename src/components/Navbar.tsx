import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <a 
        href="#hero" 
        className="logo" 
        onClick={(e) => scrollToSection(e, '#hero')}
      >
        <Sparkles className="logo-icon" size={22} />
        <span>UNIQUE HOMES</span>
      </a>

      <button 
        type="button" 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

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
      </ul>
    </nav>
  );
};
