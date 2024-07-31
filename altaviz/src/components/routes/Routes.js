import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import About from '../home/About';
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
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </>
  );
}

export default AppRoutes;
