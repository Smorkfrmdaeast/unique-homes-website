import React, { useState } from 'react';
import { Sparkles, Wind, Droplets, Flame, MessageCircle, Plus, Check, ShoppingBag } from 'lucide-react';
import { getWhatsAppOrderLink } from '../data/products';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';
import { Product } from '../types';

export const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});
  const { addToCart, setIsCartOpen } = useCart();
  const { products } = useCatalog();

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p: Product) => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const renderProductIcon = (category: Product['category']) => {
    switch (category) {
      case 'perfumes':
        return <Sparkles size={36} />;
      case 'diffusers':
        return <Flame size={36} />;
      case 'body-sprays':
        return <Droplets size={36} />;
      case 'air-fresheners':
        return <Wind size={36} />;
      default:
        return <Sparkles size={36} />;
    }
  };

  return (
    <section id="products">
      <div className="section-container">
        <h2>Our Products</h2>
        <div className="section-divider"></div>
        <p className="section-subtext">
          Explore our collection of handcrafted luxury perfumes, reed diffusers, and refreshing body sprays.
        </p>

        {/* Filter categories */}
        <div className="product-filters">
          <button 
            type="button"
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Fragrances ({products.length})
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
          {filteredProducts.map((product: Product) => {
            const isAdded = !!addedIds[product.id];

            return (
              <div key={product.id} className="product-card">
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}

                <div className="product-image-container">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="product-card-photo"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="product-image-fallback">
                      {renderProductIcon(product.category)}
                      <span className="image-label">{product.volume || 'Authentic Blend'}</span>
                    </div>
                  )}
                  {product.volume && (
                    <span className="product-volume-pill">{product.volume}</span>
                  )}
                </div>

                <div className="product-card-body">
                  <div className="product-category-tag">{product.categoryLabel}</div>
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>

                  {product.scentNotes && product.scentNotes.length > 0 && (
                    <div className="scent-notes">
                      {product.scentNotes.map((note: string, i: number) => (
                        <span key={i} className="note-tag">{note}</span>
                      ))}
                    </div>
                  )}

                  <p className="price tabular-nums">{product.formattedPrice}</p>

                  {/* Dual Action Buttons */}
                  <div className="product-card-actions">
                    <button 
                      type="button"
                      className={`btn-add-cart ${isAdded ? 'added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.name} to shopping bag`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={16} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>

                    <a
                      href={getWhatsAppOrderLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-quick-order"
                      title="Direct 1-click WhatsApp order"
                    >
                      <MessageCircle size={15} />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="products-view-bag-prompt">
          <button 
            type="button" 
            className="btn gold"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={18} />
            <span>Open Shopping Bag &amp; Checkout</span>
          </button>
        </div>
      </div>
    </section>
  );
};
