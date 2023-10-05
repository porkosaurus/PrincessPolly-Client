import React from 'react'
import homeTrending1 from '../../images/home-trending-1.webp'
import homeTrending2 from '../../images/home-trending-2.webp'
import './home-trending.scss'

const HomeTrending = () => {
  return (
    <>
      <h2 className='popular-styles-header home-trending-header header-2'>Trending Now</h2>  

    <div className='home-trending-container'>

    <div className='home-trending-container-individual'>
        <img src={homeTrending1} alt="" />
        <button className='home-trending-container-button'>New Dresses</button>
    </div>
    <div className='home-trending-container-individual'>
        <img className="home-trending-image" src={homeTrending2} alt="" />
        <button className='home-trending-container-button'>Spring Tops</button>
    </div>
    </div>
    </>

  )
}

export default HomeTrending