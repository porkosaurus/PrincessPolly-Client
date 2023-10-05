import React from 'react'
import {useState, useEffect} from 'react'
import './cart-dropdown.scss'

const CartDropdown = () => {
    const [cartData, setCartData] = useState([]);
    const [productData, setProductData] = useState([]);
    const username = localStorage.getItem("username");
  

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

  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
        {Object.keys(productData).map((selectedSize) => (
  <div className='cart-dropdown-product-container' key={selectedSize}>
    {productData[selectedSize].map((product, index) => (
      <div className='cart-dropdown-whole' key={index}>
        <img className='cart-dropdown-image' src={product.image_link} alt='' />
        <div className='cart-dropdown-info'>
          <h2 className='cart-dropdown-header'>{product.name}</h2>
          <h3 className='cart-dropdown-header'>Price: {product.price}</h3>
          <h4 className='cart-dropdown-header'>Color: {product.color}</h4>
          <h4 className='cart-dropdown-header'>Size: {selectedSize}</h4>
        </div>
      </div>
    ))}
  </div>
))}

        </div>
        <a className='cart-dropdown-link' href="/checkout"><button className='cart-button'>Go to checkout</button></a>

    </div>
  )
}

export default CartDropdown