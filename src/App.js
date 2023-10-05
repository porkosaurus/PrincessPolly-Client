import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './routes/home/home';
import Navigation from './routes/navigation/navigation';
import Shop from './routes/shop/shop';
import Login from './routes/login/login';
import ProductPage from './routes/product-page/product-page';
import React from 'react';
import Register from './routes/register/register';
import Checkout from './routes/checkout/checkout';
import CartPopup from './components/cart-popup/cart-popup';
import { AuthProvider } from './utilities/authContext';
import { CartProvider } from './utilities/cartContext';
import { BookmarkProvider } from './utilities/bookmarkContext'
import { CartVisibilityProvider } from './utilities/cartVisibilityContext';


const App = () => {
  const navigate = useNavigate();

  // const renderPrivateRoute = (Component, props) => {
  //   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  //   if (isAuthenticated) {
  //     return <Component {...props} />;
  //   } else {
  //     navigate('/login', {replace: true});
  //     return null;
  //   }
  // };

  return (
    <AuthProvider>
    <CartProvider>
    <BookmarkProvider>
    <CartVisibilityProvider>
    <Routes>

      <Route path="/" element={<Navigation />}>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:itemId" element={<ProductPage />} />
      <Route path="/checkout" element={<Checkout/>}></Route>
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

    </Routes>
    </CartVisibilityProvider>
    </BookmarkProvider>
    </CartProvider>
    </AuthProvider>
  );
};

export default App;
