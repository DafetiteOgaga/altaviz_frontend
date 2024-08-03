import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import About from '../main/About';
import Products from '../main/Products';
import ContactUs from '../main/ContactUs';
import Testfetchapi from '../Testfetchapi';
import Custodian from '../SideBar/Custodian';
import Workshop from '../SideBar/Workshop';
import Engineer from '../SideBar/Engineer';
import HelpDesk from '../SideBar/HelpDesk';
import Supervisor from '../SideBar/Supervisor';
import HumanResource from '../SideBar/HumanResource';
import Product1 from '../products/Product1';
import Product2 from '../products/Product2';
import Product3 from '../products/Product3';
import PageNotFound from '../PageNotFound';
import Success from '../success/Success';
// import About from './components/About';
// import Contact from './components/Contact';
// import Navigation from '../header/Navigation';
// import Category from '../Category';

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/product1" element={<Product1 />} />
        <Route path="/products/product2" element={<Product2 />} />
        <Route path="/products/product3" element={<Product3 />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/custodian" element={<Custodian />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/engineer" element={<Engineer />} />
        <Route path="/help-desk" element={<HelpDesk />} />
        <Route path="/supervisor" element={<Supervisor />} />
        <Route path="/human-resource" element={<HumanResource />} />
        <Route path="/success" element={<Success />} />
        <Route path="/test" element={<Testfetchapi />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
