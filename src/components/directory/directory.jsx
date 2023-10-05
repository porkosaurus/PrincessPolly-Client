import React from 'react'
import './directory.scss'
import CategoryItem from '../category-item/category-item'

const Directory = ({categories}) => {
  return (
    <div className="directory">
    <h1 className='popular-styles-header'>Our Categories</h1>
    <div className="categories-container">
    {categories.map((category) => (
      <CategoryItem key = {category.id} category = {category}/>
    ))}
    </div>
  </div>
  )
}

export default Directory