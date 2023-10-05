import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, setData, useState, useContext } from 'react';
import './product-page.scss'
import { useCart } from '../../utilities/cartContext';
import { useBookmark } from '../../utilities/bookmarkContext';

const ProductPage = () => {
    const { itemId } = useParams();
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    const [bookmark, setBookmark] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null); // To store the selected size
    const username = localStorage.getItem('username');
    const { incrementCartCount } = useCart();
    const {incrementBookmarkCount} = useBookmark()

    const [sizeContainerWidth, setSizeContainerWidth] = useState('10%'); // Initial width
    const [numberOfSizeButtons, setNumberOfSizeButtons] = useState(3); // Initial count, adjust as needed


    const sizeButtonClickHandler = (size) => {
      setSelectedSize(size);
    };
  

    useEffect(() => {
      fetch('https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/shop')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          const item = data.find((item) => item._id === itemId);
          if (item) {
            // Calculate the width based on the number of sizes
            const calculatedWidth = `${(10 * (item.sizes?.length || 3))}%`;
            setSizeContainerWidth(calculatedWidth);
          }
        })
        .catch((err) => console.log(err));
    }, [itemId]);

      const item = data.find(item => item._id === itemId);



      const addCartHandler = () => {

        if (!username) {
          // Display an error message if username is null
          alert('Please sign in.');
          return;
        }

        if (!selectedSize) {
          // Display an error message if no size is selected
          alert('Please select a size before adding to cart.');
          return;
        }
        console.log('Selected Size (Client):', selectedSize);

        const updatedCart = [...cart, { ...item, selectedSize }];
        incrementCartCount();
        setCart(updatedCart);
    
        fetch('https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            products: updatedCart,
            selectedSize: selectedSize,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Cart data sent to the server:', data);
          })
          .catch(err => console.log(err));
      }

      
      const addBookmarkHandler = () => {
        const updatedBookmark = [...bookmark, item]
        incrementBookmarkCount(); 
        setBookmark(updatedBookmark)
        fetch('https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/bookmark', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            products: updatedBookmark
          }),
        })
          .then(response => response.json())
          .then(bookmarkData => {
            console.log('Bookmark data sent to the server:', bookmarkData);
          })
          .catch(err => console.log(err));
      }

      return (
        <div className='product-page-container'>
          <div>
          {item && (
            <div className='products-container'>
              <div className='products-image-container'>
                <img className='products-image' src={`${item.image_link}`} alt={item.name}/>
              </div>
            <div className='products-desc-container'>
              <h2 className='products-name'>{item ? item.name : 'Item not found'}</h2>
              <h3 className='products-designer'>Pima Soft by A.Design. Tibilisi</h3>
              <p className='products-price'>{item.price}</p>
              <p className='products-design-details'>Crafted with meticulous attention to detail, this piece combines style and comfort effortlessly.</p>
              <p>Description: {item.description}</p>
              <div className='products-save-and-size'>
                <div className='save-container'>
                <i class="fa-regular fa-bookmark" onClick={addBookmarkHandler}></i>
                </div>
              <button  className='products-button' onClick={addCartHandler}>Select Size</button>
              </div>
              <div className="size-container" style={{ width: sizeContainerWidth }}>
          {item.sizes.map((size, index) => (
            <div
              className={`size-button ${selectedSize === size ? 'selected' : ''}`}
              key={index}
              onClick={() => sizeButtonClickHandler(size)}
            >
              <p>{size}</p>
            </div>
          ))}
            </div>
              <div className='products-further-details'>
                <h4 className='products-further-details-header'>Details & Care</h4>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <button  className='products-button products-cart-button' onClick={addCartHandler}>Add to Cart</button>
            </div>
            </div>
          )}
          </div>
        </div>

      );
}

export default ProductPage;