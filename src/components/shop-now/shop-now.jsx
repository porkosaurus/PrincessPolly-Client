import React from 'react'
import { Link } from 'react-router-dom';
import '../shop-now/shop-now.scss'

export const ShopNow = ({shopnow}) => {
  return (
    <React.Fragment>
        <Link to = "/shop">
            <div className = "shop-now" style={{backgroundImage: `url(${shopnow})`}}>
            </div>
        </Link>

    </React.Fragment>
  )
}

export default ShopNow
