import '../../App.css';
import CategoryItem from '../../components/category-item/category-item'
import Directory from '../../components/directory/directory'
import PopularStyles from '../../components/popular-styles/popular-styles'
import dress from '../../images/dresses-category-header.webp'
import swim from '../../images/swim-category-header.jpg'
import tops from '../../images/tops-category-header.jpg'
import bottoms from '../../images/bottoms-category-header.jpg'
import shoes from '../../images/shoes-category-header.webp'
import shopnow from '../../images/desktop-shop-now.webp'
import React, { useState, useEffect, useContext } from "react";
import ShopNow from '../../components/shop-now/shop-now';
import HomeTrending from '../../components/home-trending/home-trending';
import { AuthContext } from '../../utilities/authContext';
import './home.scss'

function Home() {
  const ctx = useContext(AuthContext)

  const [data, setData] = useState([]);
  const [authData, setAuthData] = useState([])


  useEffect(() => {
    fetch('https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/shop')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
      console.log(data)
      console.log(ctx)
  }, []);

    useEffect(() => {
    console.log(data);
  }, [data]);

  const categories = [{
    id: "1",
    title: "Dresses",
    imageUrl: dress
  },
  {
    id: "2",
    title: "Swim",
    imageUrl: swim
  },
  {
    id: "3",
    title: "Tops",
    imageUrl : tops
  },
  {
    id: "4",
    title: "Bottoms",
    imageUrl : bottoms
  },
  {
    id: "5",
    title: "Shoes",
    imageUrl : shoes
  }
]

  return (
    <div>
      <ShopNow shopnow = {shopnow}></ShopNow>
      <div>
      {data.length > 0 ? (
        <PopularStyles data={data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
    <HomeTrending></HomeTrending>
    <Directory categories = {categories}/>
    </div>
  );
}

export default Home;