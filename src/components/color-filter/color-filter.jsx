import React, { useState, useEffect } from 'react';
import './color-filter.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const ColorFilter = ({ items }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);

  function handleColorSelection(color) {
    setSelectedColor(color);
    // Close the color dropdown when an option is selected
    setColorDropdownVisible(false);
  }

  function handleCategorySelection(category) {
    setSelectedCategory(category);
    // Close the category dropdown when an option is selected
    setCategoryDropdownVisible(false);
  }

  // Function to update search state based on the URL query parameter
  const updateSearchFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('query');
    if (queryParam) {
      setSearch(queryParam);
    }
  };

  useEffect(() => {
    // Update the search state when the URL changes
    updateSearchFromQuery();
  }, [location.search]);

  function handleSearch(event) {
    const query = event.target.value;
    setSearch(query);
    // Update the URL query parameter when the search input changes
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('query', query);
    navigate({ search: searchParams.toString() });
    }

  function toggleColorDropdown() {
    setColorDropdownVisible(!colorDropdownVisible);
  }

  function toggleCategoryDropdown() {
    setCategoryDropdownVisible(!categoryDropdownVisible);
  }

  const filteredItems = items.filter((item) => {
    const colorMatch = !selectedColor || item.color === selectedColor;
    const categoryMatch = !selectedCategory || item.category === selectedCategory;
    const searchResult = item.name.toLowerCase().includes(search.toLowerCase());

    return colorMatch && categoryMatch && searchResult;
  });

  const selectedColorText = selectedColor ? selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1) : 'Select Color';
  const selectedCategoryText = selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'Select Category';

  return (
    <div className='shop-page'>
      <div className="filter-container">
      <div className='search-container'>
          <input className="clothing-search" type="text" onChange={handleSearch} placeholder='SEARCH' />
          <i class="fas fa-search"></i>
        </div>
        <div className='dropdown-container'>
        <div className="color-dropdown">
          <h3 className='dropdown-header'>Colors</h3>
  <div className='dropdown-row'>
    <div className='dropdown-row-individual-container' onClick={() => handleColorSelection('Red')}>
      <label htmlFor="red" className='circle-label red'></label>
      <div className='dropdown-row-individual'>Red</div>
    </div>
    <div className='dropdown-row-individual-container' onClick={() => handleColorSelection('Blue')}>
      <label htmlFor="blue" className='circle-label blue'></label>
      <div className='dropdown-row-individual'>Blue</div>
    </div>
    <div className='dropdown-row-individual-container' onClick={() => handleColorSelection('Green')}>
      <label htmlFor="green" className='circle-label green'></label>
      <div className='dropdown-row-individual'>Green</div>
    </div>
    <div className='dropdown-row-individual-container' onClick={() => handleColorSelection('Purple')}>
      <label htmlFor="purple" className='circle-label purple'></label>
      <div className='dropdown-row-individual'>Purple</div>
    </div>
    <div className='dropdown-row-individual-container' onClick={() => handleColorSelection('White')}>
      <label htmlFor="white" className='circle-label white'></label>
      <div className='dropdown-row-individual'>White</div>
    </div>
    <div className='dropdown-row-individual-container' onClick={() => handleColorSelection('Black')}>
      <label htmlFor="black" className='circle-label black'></label>
      <div className='dropdown-row-individual'>Black</div>
    </div>
    <div className='dropdown-row-individual-container' onClick={() => handleColorSelection('Yellow')}>
      <label htmlFor="yellow" className='circle-label yellow'></label>
      <div className='dropdown-row-individual'>Yellow</div>
    </div>
    <div className='dropdown-row-individual-container' onClick={() => handleColorSelection('Pink')}>
      <label htmlFor="pink" className='circle-label pink'></label>
      <div className='dropdown-row-individual'>Pink</div>
    </div>
  </div>
</div>


          <div className="category-dropdown">
            <h3 className='dropdown-header'>Categories</h3>
            <div className='dropdown-row'>
            <div className='dropdown-row-individual-container' onClick={() => handleCategorySelection('dresses')}>
                <label htmlFor="dresses" className='circle-label category'></label>
                <div className='dropdown-row-individual'>Dresses</div>
              </div>
              <div className='dropdown-row-individual-container' onClick={() => handleCategorySelection('tops')}>
                <label htmlFor="tops" className='circle-label category'></label>
                <div className='dropdown-row-individual'>Tops</div>
              </div>
              <div className='dropdown-row-individual-container' onClick={() => handleCategorySelection('bottoms')}>
                <label htmlFor="bottoms" className='circle-label category'></label>
                <div className='dropdown-row-individual'>Bottoms</div>
              </div>              
              <div className='dropdown-row-individual-container' onClick={() => handleCategorySelection('shoes')}>
                <label htmlFor="shoes" className='circle-label category'></label>
                <div className='dropdown-row-individual'>Shoes</div>
              </div>
              <div className='dropdown-row-individual-container' onClick={() => handleCategorySelection('swim')}>
                <label htmlFor="swim" className='circle-label category'></label>
                <div className='dropdown-row-individual'>Swim</div>
              </div>
                </div>
          </div>
        </div>
      </div>

      <ul>
        <div className="shop-container">
          {filteredItems.map((item) => (
            <div className="clothing-container" key={item._id}>
              <img className="clothing-image" src={`${item.image_link}`} alt="No image found" />
              <div className='clothing-description'>
              <p className="list-item"><a className="list-link" href={`./shop/${item._id}`}>{item.name}</a></p>
              <p className='clothing-price'>{item.price}</p>
              </div>              
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default ColorFilter;
