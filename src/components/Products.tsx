import React, { useState } from 'react';
import { Sparkles, Wind, Droplets, Flame, MessageCircle } from 'lucide-react';
import { PRODUCTS, getWhatsAppOrderLink } from '../data/products';
import { Product } from '../types';

export const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const renderProductIcon = (category: Product['category']) => {
    switch (category) {
      case 'perfumes':
        return <Sparkles size={40} />;
      case 'diffusers':
        return <Flame size={40} />;
      case 'body-sprays':
        return <Droplets size={40} />;
      case 'air-fresheners':
        return <Wind size={40} />;
      default:
        return <Sparkles size={40} />;
    }
  };

  return (
    <section id="products">
      <div className="section-container">
        <h2>Our Products</h2>
        <div className="section-divider"></div>
        <p className="section-subtext">
          Explore our collection of handcrafted perfumes, room diffusers, and luxury body sprays.
        </p>

        {/* Filter categories */}
        <div className="product-filters">
          <button 
            type="button"
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Fragrances ({PRODUCTS.length})
          </button>
          <button 
            type="button"
            className={`filter-btn ${selectedCategory === 'perfumes' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('perfumes')}
          >
            Perfumes
          </button>
          <button 
            type="button"
            className={`filter-btn ${selectedCategory === 'diffusers' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('diffusers')}
          >
            Home Diffusers
          </button>
          <button 
            type="button"
            className={`filter-btn ${selectedCategory === 'body-sprays' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('body-sprays')}
          >
            Body Sprays
          </button>
          <button 
            type="button"
            className={`filter-btn ${selectedCategory === 'air-fresheners' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('air-fresheners')}
          >
            Air Fresheners
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {product.badge && (
                <span className="product-badge">{product.badge}</span>
              )}

              <div className="product-image">
                {renderProductIcon(product.category)}
                <span className="image-label">{product.volume || 'Authentic Blend'}</span>
              </div>

              <div className="product-category-tag">{product.categoryLabel}</div>
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>

              {product.scentNotes && product.scentNotes.length > 0 && (
                <div className="scent-notes">
                  {product.scentNotes.map((note, i) => (
                    <span key={i} className="note-tag">{note}</span>
                  ))}
                </div>
              )}

              <p className="price">{product.formattedPrice}</p>

              <a
                href={getWhatsAppOrderLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn gold"
              >
                <MessageCircle size={16} />
                <span>Order Now</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
