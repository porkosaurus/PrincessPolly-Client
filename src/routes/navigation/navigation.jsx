import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './navigation.scss'
import CartPopup from '../../components/cart-popup/cart-popup'
import axios from 'axios'
import { AuthContext } from '../../utilities/authContext'
import CartIcon from '../../components/cart-icon/cart-icon'
import { useCartVisibility } from '../../utilities/cartVisibilityContext'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown'
const Navigation = () => {

  const { isCartVisible } = useCartVisibility();
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  const[hovered, setHovered] = useState(null);
  const [logoutKey, setLogoutKey] = useState(0);

  function handleMouseOver(){
    setHovered(true);
  }
  function handleMouseLeave(){
    setHovered(false)
  }

  const handleMouseEnter = () => {
    setShowCartDropdown(true);
  };


  const[user, setUser] = useState(null)

  const ctx = useContext(AuthContext);

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const username = localStorage.getItem("username")


  useEffect(() => {
    axios.get("https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/profile")
    .then(response => {
      setUser(response.data.user)
    })
    .catch(error => {
      console.log(error);
    })
    console.log(isAuthenticated);
    console.log(username)
  }, [logoutKey])


  function handleLogout(){
    localStorage.removeItem("username")
    localStorage.setItem('isAuthenticated', 'false');
    ctx.setIsAuthenticated(false);
    setLogoutKey((prevKey) => prevKey + 1); 
   }

   const [search, setSearch] = useState('');


   function handleSearch(event) {
    setSearch(event.target.value);
  }

  //Navigation

  const navigate = useNavigate();
  const [navSearchQuery, setNavSearchQuery] = useState('');

  const handleNavSearch = (e) => {
    const query = e.target.value;
    setNavSearchQuery(query);
  };


  const handleNavSearchSubmit = () => {
    // Navigate to the "/shop" page with the query as a parameter
    navigate(`/shop?query=${encodeURIComponent(navSearchQuery)}`);
  };



  return (
    <div>
        <div className='navigation-container'>
           <div className='navigation-header'>
            <h4 className='navigation-currency'>$USD</h4>
            <div className='navigation-image-container'>
            <img className='navigation-header-image' src="https://us.princesspolly.com/cdn/shop/t/641/assets/logo-2023.svg?v=139594725385041978601689699051" class="header__logo-image" alt="Princess Polly USA" width="200" height="26"/>

            </div>
           <div className='navigation-search-container'>
           <input
        className="navigation-input"
        type="text"
        onChange={handleNavSearch}
        placeholder='Search for items...'
        value={navSearchQuery}
      />          <i class="fas fa-search" onClick={handleNavSearchSubmit}></i>
          </div>
            </div>
            <nav className='navigation-bar-container'>

                <ul className='navigation-list'>
                    <li className='navigation-elements'><a className='navigation-links' href="/">Home</a></li>
                    <li className='navigation-elements'><a className='navigation-links' href="/shop">Shop</a></li>

                    { isAuthenticated === "true" ? 
                    (
                      <>
                        <li onClick={handleLogout} className='navigation-elements'><a className='navigation-links' href="#">Logout</a></li>
                        <li className='navigation-elements'><a className='navigation-links' href="/checkout">Checkout</a></li>
                        <li className='navigation-elements cart-element'><CartIcon></CartIcon></li>
                        {
                          isCartVisible && <CartDropdown></CartDropdown>

                        }
                      </>
                    )
                    :
                    (
                      <>
                      <li className='navigation-elements'><a className='navigation-links' href="/login">Sign In</a></li>
                      <li className='navigation-elements'><a className='navigation-links' href="/register">Sign Up</a></li>

                      </>
                    )
                    }

                </ul>
            </nav>
        </div>
        <Outlet/>
    </div>
  )
}

export default Navigation