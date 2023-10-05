import React from 'react'

const CartPopup = (props) => {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-innner'>
            <button className='close-button'>Close</button>
            {props.children}
        </div>
    </div>
  ) : ""
}

export default CartPopup