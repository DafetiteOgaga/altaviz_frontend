import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css'
import GetProductDetails from '../../hooks/GetProductNHeroDetails';

function DropdownMenu () {
  const products = GetProductDetails({type: 'details'});
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    const aboutIndexDisabled = document.getElementById('about-animation');
    // const aboutIndexEnabled = document.getElementById('abot-animation');
    if (!isOpen && aboutIndexDisabled) {
      aboutIndexDisabled.setAttribute('id', 'abot-animation');
      console.log('id removed');
      console.log('about index:', aboutIndexDisabled);
    }
  };

  return (
    <div className="dropdown">
      <a href='/products' onMouseOver={toggleDropdown} onClick={toggleDropdown} className="dropdown-button">
        Products
      </a>
      {(isOpen) && (
        <div className="dropdown-content">
          {products.map(product => {
            // console.log('Product:', product)
            return (
            <div key={product.id}
            className='fade-in'>
              <Link to={`/products/product/${product.id}`}><span style={{textWrap: 'nowrap'}}>{product.description.title}</span></Link>
            </div>
          )})}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
