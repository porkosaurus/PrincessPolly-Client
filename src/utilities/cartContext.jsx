import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the CartContext
const CartContext = createContext();

// Create a CartProvider component to wrap your entire application
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart data from the backend and set the initial cartCount
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) { // Check if username is not null
      fetch(`https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/getcartlength/${username}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Cart Length:', data);
          setCartCount(data);
        })
        .catch((err) => console.error(err));
    }
  }, []);
  

  // Function to increment cartCount
  const incrementCartCount = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <CartContext.Provider value={{ cartCount, incrementCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Create a custom hook to use the CartContext
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

