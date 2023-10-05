import './popular-styles.scss'
import React from 'react'


const PopularStyles = ({data}) => {
  console.log(data);
  return (
<div>
  <div className='popular-styles-full-container'>
  <h2 className='popular-styles-header header-1'>Shop our Popular Styles</h2>  
  <div className='popular-styles-container'>
    <div className='popular-styles-container-box' style={{ backgroundImage: `url(${data[15]['image_link']})` }}>
      <button className='popular-styles-container-button'><a className='popular-styles-link' href={`/shop/${data[15]['_id']}`}>Shop Now</a></button>
    </div>
    <div className='popular-styles-container-box' style={{ backgroundImage: `url(${data[1]['image_link']})` }}>
      <button className='popular-styles-container-button'><a className='popular-styles-link' href={`/shop/${data[1]['_id']}`}>Shop Now</a></button>
    </div>
    <div className='popular-styles-container-box' style={{ backgroundImage: `url(${data[2]['image_link']})` }}>
      <button className='popular-styles-container-button'><a className='popular-styles-link' href={`/shop/${data[2]['_id']}`}>Shop Now</a></button>
    </div>
    <div className='popular-styles-container-box' style={{ backgroundImage: `url(${data[14]['image_link']})` }}>
      <button className='popular-styles-container-button'><a className='popular-styles-link' href={`/shop/${data[14]['_id']}`}>Shop Now</a></button>
    </div>
  </div>
  </div>
  </div>

  )
}

export default PopularStyles