import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css'
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';

function DropdownMenu () {
  const { useFetchGET } = useContext(GlobalContext);
  const products = useFetchGET('http://localhost:8000/product/')
  // console.log('products (DROPDOWN):', products);
  // console.log('products data (DROPDOWN):', products.data);
  // try {
  //   console.log('products data index[0] (DROPDOWN):', products.data[0]);
  //   console.log('products data index[0] id (DROPDOWN):', products.data[0].id);
  //   console.log('products data index[0] title (DROPDOWN):', products.data[0].title);
  // } catch (error) {
  //   console.log('WAIT, LOADING ...')
  // }
  
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
      <a href='/products' onMouseOver={toggleDropdown} onClick={toggleDropdown} className="dropdown-button">
        Products
      </a>
      {isOpen && (
        <div className="dropdown-content">
          {products.data.map(product => {
            // console.log('Product:', product)
            return (
            <div key={product.id}>
              <Link to={`/products/product/${product.id}`}>{product.title}</Link>
            </div>
          )})}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
