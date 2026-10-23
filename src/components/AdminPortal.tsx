import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ShoppingBag, 
  ArrowLeft, 
  LogOut, 
  Upload, 
  Image as ImageIcon,
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useCatalog } from '../context/CatalogContext';
import { Product } from '../types';

interface AdminPortalProps {
  onBackToStore: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToStore }) => {
  const { 
    isAuthenticated, 
    currentUser, 
    masterEmail, 
    hasPinSet, 
    signInWithGoogle, 
    setAdminPin, 
    verifyPin, 
    logout 
  } = useAdminAuth();

  const { products, addProduct, updateProduct, deleteProduct, toggleStockStatus, resetCatalogToDefaults } = useCatalog();

  // Login form states
  const [googleEmailInput, setGoogleEmailInput] = useState('');
  const [googleNameInput, setGoogleNameInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [loginStep, setLoginStep] = useState<'google' | 'pin'>('google');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);
  const [newPinSetup, setNewPinSetup] = useState('');

  // Dashboard states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Add / Edit
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Product['category']>('perfumes');
  const [formCategoryLabel, setFormCategoryLabel] = useState('Perfume');
  const [formPrice, setFormPrice] = useState<number>(5000);
  const [formVolume, setFormVolume] = useState('100ml EDP');
  const [formBadge, setFormBadge] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formScentNotes, setFormScentNotes] = useState<string[]>([]);
  const [scentNoteInput, setScentNoteInput] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  const handleGoogleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const email = googleEmailInput.trim();
    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid Google Account email address.');
      return;
    }

    const name = googleNameInput.trim() || email.split('@')[0];
    const res = await signInWithGoogle(email, name);

    if (!res.success) {
      setAuthError(res.message);
      return;
    }

    setAuthSuccessMsg(res.message);

    if (!hasPinSet) {
      setLoginStep('pin');
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasPinSet) {
      if (newPinSetup.length < 4) {
        setAuthError('Security PIN must be at least 4 digits.');
        return;
      }
      setAdminPin(newPinSetup);
      showToast('Master Admin PIN set successfully!');
      setAuthError(null);
    } else {
      if (!verifyPin(pinInput)) {
        setAuthError('Incorrect Admin Security PIN. Please try again.');
        return;
      }
      setAuthError(null);
      showToast('Admin authenticated successfully!');
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('perfumes');
    setFormCategoryLabel('Perfume');
    setFormPrice(5000);
    setFormVolume('100ml EDP');
    setFormBadge('New Arrival');
    setFormDescription('');
    setFormScentNotes(['Amber', 'Vanilla']);
    setFormImageUrl(products[0]?.imageUrl || '');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormCategoryLabel(product.categoryLabel);
    setFormPrice(product.price);
    setFormVolume(product.volume || '');
    setFormBadge(product.badge || '');
    setFormDescription(product.description);
    setFormScentNotes(product.scentNotes || []);
    setFormImageUrl(product.imageUrl || '');
    setIsModalOpen(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormImageUrl(reader.result);
          showToast('Image uploaded from device!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addScentNote = () => {
    const note = scentNoteInput.trim();
    if (note && !formScentNotes.includes(note)) {
      setFormScentNotes([...formScentNotes, note]);
      setScentNoteInput('');
    }
  };

  const removeScentNote = (indexToRemove: number) => {
    setFormScentNotes(formScentNotes.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Please enter a product name');
      return;
    }

    const payload = {
      name: formName.trim(),
      category: formCategory,
      categoryLabel: formCategoryLabel,
      description: formDescription.trim() || 'Signature luxury fragrance by UNIQUE HOMES.',
      price: Number(formPrice) || 5000,
      badge: formBadge.trim(),
      volume: formVolume.trim() || 'Standard',
      scentNotes: formScentNotes,
      imageUrl: formImageUrl,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      showToast(`Updated "${formName}" successfully!`);
    } else {
      addProduct(payload);
      showToast(`Published "${formName}" live to store!`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteWithConfirm = (product: Product) => {
    if (window.confirm(`Are you sure you want to remove "${product.name}" from the store catalog?`)) {
      deleteProduct(product.id);
      showToast(`Removed "${product.name}" from catalog.`);
    }
  };

  // Metrics with explicit typing
  const totalFragrances = products.length;
  const perfumeCount = products.filter((p: Product) => p.category === 'perfumes').length;
  const diffuserCount = products.filter((p: Product) => p.category === 'diffusers').length;
  const sprayCount = products.filter((p: Product) => p.category === 'body-sprays').length;
  const totalValue = products.reduce((sum: number, p: Product) => sum + p.price, 0);

  const filteredProducts = products.filter((p: Product) => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  /* ========================================================
     AUTHENTICATION SCREEN (If not signed in)
     ======================================================== */
  if (!isAuthenticated) {
    return (
      <div className="admin-auth-wrapper">
        <div className="admin-auth-card">
          <div className="admin-auth-header">
            <div className="admin-shield-icon">
              <ShieldCheck size={38} color="#D4AF37" />
            </div>
            <h2>UNIQUE HOMES Admin</h2>
            <p className="admin-subtitle">
              Publish &amp; manage products directly from your phone, tablet, or desktop.
            </p>
          </div>

          {authError && (
            <div className="admin-auth-alert error">
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          {authSuccessMsg && (
            <div className="admin-auth-alert success">
              <CheckCircle2 size={16} />
              <span>{authSuccessMsg}</span>
            </div>
          )}

          {masterEmail ? (
            <div className="admin-master-claimed-badge">
              <Lock size={14} color="#D4AF37" />
              <span>
                Master Owner Account: <strong>{masterEmail}</strong>
              </span>
            </div>
          ) : (
            <div className="admin-first-time-notice">
              <Sparkles size={16} color="#D4AF37" />
              <span>
                <strong>First-Time Setup:</strong> The first Google account you sign in with will be permanently registered as the Master Owner.
              </span>
            </div>
          )}

          {/* Step 1: Google Sign In */}
          {loginStep === 'google' ? (
            <form onSubmit={handleGoogleSignInSubmit} className="admin-login-form">
              <div className="form-group">
                <label>Google Account Email</label>
                <div className="input-with-icon">
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@gmail.com"
                    value={googleEmailInput}
                    onChange={(e) => setGoogleEmailInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Your Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Unique Homes Director"
                  value={googleNameInput}
                  onChange={(e) => setGoogleNameInput(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-google-signin">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>

              <div className="admin-demo-help">
                <small>Works on any smartphone, iPad, tablet, MacBook, or Windows PC.</small>
              </div>
            </form>
          ) : (
            /* Step 2: PIN Setup */
            <form onSubmit={handlePinSubmit} className="admin-login-form">
              <div className="form-group">
                <label>
                  {!hasPinSet ? 'Create a 4-Digit Security PIN for Mobile' : 'Enter Admin PIN'}
                </label>
                <input
                  type="password"
                  maxLength={6}
                  required
                  placeholder="••••"
                  value={!hasPinSet ? newPinSetup : pinInput}
                  onChange={(e) => (!hasPinSet ? setNewPinSetup(e.target.value) : setPinInput(e.target.value))}
                  style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '4px' }}
                />
              </div>

              <button type="submit" className="btn gold" style={{ width: '100%', marginTop: '10px' }}>
                <Check size={18} />
                <span>{!hasPinSet ? 'Set Security PIN & Enter' : 'Unlock Admin Portal'}</span>
              </button>
            </form>
          )}

          <div className="admin-auth-footer">
            <button type="button" className="admin-back-btn" onClick={onBackToStore}>
              <ArrowLeft size={16} />
              <span>Back to Public Store</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================
     AUTHENTICATED ADMIN DASHBOARD
     ======================================================== */
  return (
    <div className="admin-dashboard-wrapper">
      {/* Toast */}
      {notificationMsg && (
        <div className="admin-toast">
          <CheckCircle2 size={18} color="#25D366" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <button type="button" className="btn-admin-nav-back" onClick={onBackToStore}>
            <ArrowLeft size={16} />
            <span>Storefront</span>
          </button>
          <div className="admin-brand-lockup">
            <span className="admin-badge-owner">Master Admin</span>
            <h3>UNIQUE HOMES Studio</h3>
          </div>
        </div>

        <div className="admin-topbar-right">
          <div className="admin-user-pill">
            <div className="admin-status-dot"></div>
            <span className="admin-user-email">{currentUser?.email}</span>
          </div>

          <button type="button" className="btn-admin-logout" onClick={logout} title="Sign out">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="admin-main-container">
        {/* Metrics Strip */}
        <section className="admin-metrics-grid">
          <div className="admin-metric-card">
            <div className="metric-header">
              <span>Total Fragrances</span>
              <Sparkles size={16} color="#D4AF37" />
            </div>
            <div className="metric-value">{totalFragrances}</div>
            <div className="metric-sub">Published to live shop</div>
          </div>

          <div className="admin-metric-card">
            <div className="metric-header">
              <span>Perfumes</span>
              <Sparkles size={16} color="#D4AF37" />
            </div>
            <div className="metric-value">{perfumeCount}</div>
            <div className="metric-sub">Eau De Parfum blends</div>
          </div>

          <div className="admin-metric-card">
            <div className="metric-header">
              <span>Home Diffusers</span>
              <Sparkles size={16} color="#D4AF37" />
            </div>
            <div className="metric-value">{diffuserCount}</div>
            <div className="metric-sub">Reed &amp; space scents</div>
          </div>

          <div className="admin-metric-card">
            <div className="metric-header">
              <span>Body Sprays</span>
              <Sparkles size={16} color="#D4AF37" />
            </div>
            <div className="metric-value">{sprayCount}</div>
            <div className="metric-sub">Luxury all-day mists</div>
          </div>

          <div className="admin-metric-card highlight">
            <div className="metric-header">
              <span>Catalog Value</span>
              <DollarSign size={16} color="#25D366" />
            </div>
            <div className="metric-value tabular-nums">₦{totalValue.toLocaleString()}</div>
            <div className="metric-sub">Avg unit price active</div>
          </div>
        </section>

        {/* Action Controls & Filters */}
        <section className="admin-actions-bar">
          <div className="actions-left">
            <button type="button" className="btn gold btn-add-product" onClick={openAddModal}>
              <Plus size={18} />
              <span>Post New Fragrance</span>
            </button>
            <input
              type="text"
              placeholder="Search catalog..."
              className="admin-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="actions-right">
            <div className="admin-filter-tabs">
              <button
                type="button"
                className={`admin-filter-tab ${categoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                All ({products.length})
              </button>
              <button
                type="button"
                className={`admin-filter-tab ${categoryFilter === 'perfumes' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('perfumes')}
              >
                Perfumes
              </button>
              <button
                type="button"
                className={`admin-filter-tab ${categoryFilter === 'diffusers' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('diffusers')}
              >
                Diffusers
              </button>
              <button
                type="button"
                className={`admin-filter-tab ${categoryFilter === 'body-sprays' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('body-sprays')}
              >
                Body Sprays
              </button>
            </div>
          </div>
        </section>

        {/* Product Cards List */}
        <section className="admin-products-list">
          <div className="admin-list-header">
            <h4>Live Catalog Items ({filteredProducts.length})</h4>
            <button 
              type="button" 
              className="btn-admin-reset" 
              onClick={() => {
                if (window.confirm('Reset catalog back to the original brand defaults?')) {
                  resetCatalogToDefaults();
                  showToast('Catalog restored to original brand setup.');
                }
              }}
            >
              Reset to Brand Defaults
            </button>
          </div>

          <div className="admin-cards-grid">
            {filteredProducts.map((product: Product) => {
              const isSoldOut = (product.badge || '').toLowerCase() === 'sold out';

              return (
                <div key={product.id} className="admin-product-card">
                  <div className="admin-card-thumb">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className="thumb-placeholder">
                        <ShoppingBag size={24} color="#D4AF37" />
                      </div>
                    )}
                    {product.badge && (
                      <span className={`admin-badge-tag ${isSoldOut ? 'sold-out' : ''}`}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="admin-card-content">
                    <div className="admin-card-row1">
                      <span className="card-cat">{product.categoryLabel} · {product.volume}</span>
                      <span className="card-price tabular-nums">{product.formattedPrice}</span>
                    </div>

                    <h4 className="card-name">{product.name}</h4>
                    <p className="card-desc">{product.description}</p>

                    {product.scentNotes && product.scentNotes.length > 0 && (
                      <div className="admin-notes-pills">
                        {product.scentNotes.map((note: string, idx: number) => (
                          <span key={idx} className="admin-note-pill">{note}</span>
                        ))}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="admin-card-foot">
                      <button
                        type="button"
                        className={`btn-stock-toggle ${isSoldOut ? 'mark-in' : 'mark-out'}`}
                        onClick={() => toggleStockStatus(product.id)}
                      >
                        {isSoldOut ? '✓ Set In Stock' : 'Mark Sold Out'}
                      </button>

                      <div className="foot-actions">
                        <button
                          type="button"
                          className="btn-action-edit"
                          onClick={() => openEditModal(product)}
                          title="Edit product"
                        >
                          <Edit3 size={15} /> Edit
                        </button>

                        <button
                          type="button"
                          className="btn-action-del"
                          onClick={() => handleDeleteWithConfirm(product)}
                          title="Remove product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ========================================================
          ADD / EDIT PRODUCT MODAL
          ======================================================== */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingProduct ? 'Edit Fragrance Item' : 'Publish New Fragrance'}</h3>
              <button 
                type="button" 
                className="admin-modal-close" 
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="admin-modal-form">
              <div className="admin-form-grid">
                <div className="form-group full-width">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Amber Oud"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => {
                      const val = e.target.value as Product['category'];
                      setFormCategory(val);
                      if (val === 'perfumes') setFormCategoryLabel('Perfume');
                      if (val === 'diffusers') setFormCategoryLabel('Home Diffuser');
                      if (val === 'body-sprays') setFormCategoryLabel('Body Spray');
                      if (val === 'air-fresheners') setFormCategoryLabel('Air Freshener');
                    }}
                  >
                    <option value="perfumes">Perfumes (EDP)</option>
                    <option value="diffusers">Home Diffusers</option>
                    <option value="body-sprays">Body Sprays</option>
                    <option value="air-fresheners">Air Fresheners</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price in Naira (₦) *</label>
                  <input
                    type="number"
                    required
                    min={100}
                    step={100}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label>Bottle Size / Volume</label>
                  <input
                    type="text"
                    placeholder="e.g. 100ml EDP, 200ml Reeds"
                    value={formVolume}
                    onChange={(e) => setFormVolume(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Badge Tag (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Bestseller, Viral TikTok, Limited"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    rows={2}
                    placeholder="Describe the mood, fragrance strength, and presence..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                  />
                </div>

                {/* Scent Notes */}
                <div className="form-group full-width">
                  <label>Scent Notes</label>
                  <div className="scent-input-row">
                    <input
                      type="text"
                      placeholder="e.g. Madagascar Vanilla"
                      value={scentNoteInput}
                      onChange={(e) => setScentNoteInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addScentNote();
                        }
                      }}
                    />
                    <button type="button" className="btn-add-note" onClick={addScentNote}>
                      + Add
                    </button>
                  </div>

                  <div className="modal-notes-display">
                    {formScentNotes.map((note: string, idx: number) => (
                      <span key={idx} className="note-chip">
                        {note}
                        <button type="button" onClick={() => removeScentNote(idx)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Upload / Presets */}
                <div className="form-group full-width">
                  <label>Fragrance Photo</label>
                  <div className="image-uploader-box">
                    {formImageUrl ? (
                      <div className="image-preview-wrapper">
                        <img src={formImageUrl} alt="Preview" className="modal-img-preview" />
                        <button 
                          type="button" 
                          className="btn-change-image"
                          onClick={() => setFormImageUrl('')}
                        >
                          Remove Photo
                        </button>
                      </div>
                    ) : (
                      <div className="image-upload-controls">
                        <label className="btn-file-label">
                          <Upload size={16} />
                          <span>Upload Photo from Phone / Computer</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageFileUpload}
                          />
                        </label>
                        <span className="or-text">or choose from studio presets:</span>
                        <div className="presets-row">
                          {products.slice(0, 3).map((p: Product, idx: number) => (
                            <button
                              key={idx}
                              type="button"
                              className="preset-btn"
                              onClick={() => setFormImageUrl(p.imageUrl || '')}
                            >
                              <ImageIcon size={14} />
                              <span>{p.name} Photo</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn gold btn-save-pub">
                  <Check size={18} />
                  <span>{editingProduct ? 'Save Updates' : 'Publish to Store'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
