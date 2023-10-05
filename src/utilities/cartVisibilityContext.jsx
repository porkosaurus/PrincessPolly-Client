import React, { createContext, useContext, useState } from 'react';

const CartVisibilityContext = createContext();

export function CartVisibilityProvider({ children }) {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const showCart = () => {
    setIsCartVisible(true);
  };

  const hideCart = () => {
    setIsCartVisible(false);
  };

  return (
    <CartVisibilityContext.Provider value={{ isCartVisible, showCart, hideCart }}>
      {children}
    </CartVisibilityContext.Provider>
  );
}

export function useCartVisibility() {
  const context = useContext(CartVisibilityContext);
  if (!context) {
    throw new Error('useCartVisibility must be used within a CartVisibilityProvider');
  }
  return context;
}
