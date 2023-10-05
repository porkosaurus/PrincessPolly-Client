import React, { useEffect, useState } from 'react';
import './checkout.scss';

const Checkout = () => {
  const [cartData, setCartData] = useState([]);
  const [productData, setProductData] = useState([]);
  const username = localStorage.getItem('username');

  const handleRemoveItem = (productId, selectedSize) => {
    fetch('https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/remove-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, productId, selectedSize }),
    })
      .then((res) => {
        if (res.ok) {
          const updatedCartData = cartData.filter((item) => {
            return item.productId !== productId || item.selectedSize !== selectedSize;
          });
          setCartData(updatedCartData); // Ensure this is correctly set
        } else {
          // Handle the case when the removal request fails
          console.error('Failed to remove item from cart');
        }
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };
  

  useEffect(() => {
    if (username) {
      fetch(`https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/getcart/${username}`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((cartItems) => {
          console.log('Fetched cart items:', cartItems);

          // Extract product IDs and selected sizes from the cart data
          const productSelections = cartItems.map((item) => ({
            productId: item.product,
            selectedSize: item.selectedSize,
          }));

          // Fetch product details for each item in the cart
          const productPromises = productSelections.map(({ productId }) =>
            fetch(`https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/getproduct/${productId}`).then((response) =>
              response.json()
            )
          );

          Promise.all(productPromises)
            .then((productsData) => {
              console.log('Products data:', productsData);

              // Organize productsData into a structure based on selected sizes
              const updatedProductData = {};

              productSelections.forEach((selection, index) => {
                const { productId, selectedSize } = selection;
                const product = productsData[index];

                if (!updatedProductData[selectedSize]) {
                  updatedProductData[selectedSize] = [];
                }

                updatedProductData[selectedSize].push(product);
              });

              console.log('Updated product data:', updatedProductData);
              setProductData(updatedProductData);
            })
            .catch((error) => {
              console.error('Fetch error:', error);
            });
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    }
  }, [username]);

  
  const handleCheckout = () => {
    fetch('https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
    .then(res => {
      console.log('Response status:', res.status);
      if(res.ok) return res.json()
      return res.json().then(json =>   
      Promise.reject(json))
    }).then(({url}) => {
      window.location = url
    })
    .catch(e => {
      console.error('Fetch error:', e);
    })
  }
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>{username}'s Cart</h1>
        {Object.keys(productData).map((selectedSize) => (
          <div className="checkout-items-container" key={selectedSize}>
            {productData[selectedSize].map((product, index) => (
              <div className="checkout-item-container" key={index}>
                <div
                  className="checkout-item-image"
                  style={{ backgroundImage: `url(${product.image_link})` }}
                ></div>
                <div className="checkout-item-info">
                  <h3>{product.name}</h3>
                  <h4>Price: {product.price}</h4>
                  <h4>Color: {product.color}</h4>
                  <h4>Size: {selectedSize}</h4>
                  <button className="remove-button" onClick={() => handleRemoveItem(product._id, selectedSize)}>
                  <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='pay-container'>
        <h1 className='checkout-header'>Checkout</h1>
      {Object.keys(productData).map((selectedSize) => (
          <div className="pay-items-container" key={selectedSize}>
            {productData[selectedSize].map((product, index) => (
              <div className="pay-item-container" key={index}>
                <div className="pay-item-info">
                  <h3 className='pay-item-name'>{product.name}</h3>
                  <h4 className='pay-item-price'>Price: {product.price}</h4>
                </div>
              </div>
            ))}
          </div>
        ))}
      <button className="cart-button checkout-button" onClick={handleCheckout}>
          Pay Now
        </button>
      </div>

    </div>
  );
};

export default Checkout;

