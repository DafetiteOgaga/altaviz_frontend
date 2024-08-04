import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css'
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';

function DropdownMenu () {
  const { cardData:products } = useContext(GlobalContext);
  // console.log('products (DROPDOWN):', products);
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
    // } else {
    //   aboutIndexEnabled.setAttribute('id', 'about-animation');
    //   console.log('id added');
    //   console.log('about index:', aboutIndexEnabled);
    // }
  };

  return (
    <div className="dropdown">
      <a href='/' onMouseOver={toggleDropdown} onClick={toggleDropdown} className="dropdown-button">
        Products
      </a>
      {isOpen && (
        <div className="dropdown-content">
          {products.map(product => {
            // console.log('Product:', product)
            return (
            <span key={product.id}>
              <Link to={`/products/product/${product.id}`}>{product.title}</Link>
            </span>
          )})}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
