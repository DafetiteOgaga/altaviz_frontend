import { Link } from 'react-router-dom';
import './header.css';
import DropdownMenu from './product_dropdown_menu/DropdownMenu';

function Navigation() {
  return (
    <nav className='nav-h1'>
      <ul className='header-ul'>
        <li><DropdownMenu /></li>
        {/* <li><Link to="/products">Products</Link></li> */}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
