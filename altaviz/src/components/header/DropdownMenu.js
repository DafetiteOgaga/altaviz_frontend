// src/components/DropdownMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-button">
        Products
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <Link to="/products/product1">Product 1</Link>
          <Link to="/products/product2">Product 2</Link>
          <Link to="/products/product3">Product 3</Link>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
