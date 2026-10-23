import React from 'react';
import { CartProvider } from './context/CartContext';
import { CatalogProvider } from './context/CatalogContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { MainApp } from './MainApp';

export const App: React.FC = () => {
  return (
    <CatalogProvider>
      <AdminAuthProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </AdminAuthProvider>
    </CatalogProvider>
  );
};

export default App;
