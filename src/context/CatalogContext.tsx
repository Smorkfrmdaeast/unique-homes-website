import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

interface CatalogContextType {
  products: Product[];
  addProduct: (newProduct: Omit<Product, 'id' | 'formattedPrice'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStockStatus: (id: string) => void;
  resetCatalogToDefaults: () => void;
}

const CATALOG_STORAGE_KEY = 'unique_homes_catalog_v1';

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id' | 'formattedPrice'>): Product => {
    const id = `fragrance-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const formattedPrice = `₦${productData.price.toLocaleString()}`;
    const newProduct: Product = {
      ...productData,
      id,
      formattedPrice,
    };

    setProducts((prev: Product[]) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev: Product[]) =>
      prev.map((item: Product) => {
        if (item.id !== id) return item;

        const updatedPrice = updates.price !== undefined ? updates.price : item.price;
        const formattedPrice = `₦${updatedPrice.toLocaleString()}`;

        return {
          ...item,
          ...updates,
          price: updatedPrice,
          formattedPrice,
        };
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev: Product[]) => prev.filter((item: Product) => item.id !== id));
  };

  const toggleStockStatus = (id: string) => {
    setProducts((prev: Product[]) =>
      prev.map((item: Product) => {
        if (item.id !== id) return item;
        const currentBadge = item.badge || '';
        const isSoldOut = currentBadge.toLowerCase() === 'sold out';
        return {
          ...item,
          badge: isSoldOut ? '' : 'Sold Out',
        };
      })
    );
  };

  const resetCatalogToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStockStatus,
        resetCatalogToDefaults,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = (): CatalogContextType => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
