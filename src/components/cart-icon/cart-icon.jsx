import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../images/shopping-bag.svg';
import './cart-icon.scss';
import { useState } from 'react';
import { useCartVisibility } from '../../utilities/cartVisibilityContext';
import { useCart } from '../../utilities/cartContext';
import CartDropdown from '../cart-dropdown/cart-dropdown';
const CartIcon = () => {
  const { cartCount } = useCart(); // Use the cartCount from context
  const { isCartVisible, showCart, hideCart } = useCartVisibility();

  const handleMouseEnter = () => {
    showCart();
  };

  const handleMouseLeave = () => {
    hideCart();
  };

  return (
    <div className='cart-icon-container' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ShoppingIcon className='shopping-icon'></ShoppingIcon>
      <span className='item-count'>{cartCount}</span>

    </div>
  );
};

export default CartIcon;

