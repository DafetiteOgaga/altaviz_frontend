import { Link } from 'react-router-dom';
import './header.css';
import DropdownMenu from './product_dropdown_menu/DropdownMenu';

// const colorStyle = {
//   color: 'yello'
// }
function Navigation() {
  return (
    <nav className='nav-h1'>
      <ul className='header-ul'>
        <li><Link to="/">Home</Link></li>
        <li><DropdownMenu /></li>
        {/* <li><Link to="/products">Products</Link></li> */}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/test">Test bkend</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
