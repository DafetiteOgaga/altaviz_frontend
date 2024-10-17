import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import About from '../main/about/About';
// import Products from '../main/Products';
import ContactUs from '../main/contact_us/ContactUs';
import Testfetchapi from '../Testfetchapi';
// import Custodian from '../SideBar/custodian/Custodian';
// import CustodianForm from '../SideBar/custodian/CustodianForm';
import CustodianLandingPage from '../SideBar/custodian/CustodianLandingPage';
import Workshop from '../SideBar/workshop/Workshop';
import Engineer from '../SideBar/engineer/Engineer';
import HelpDesk from '../SideBar/help_desk/HelpDesk';
import Supervisor from '../SideBar/supervisor/Supervisor';
import HumanResource from '../SideBar/human_resource/HumanResource';
import Inventory from '../SideBar/human_resource/inventory/Inventory';
import RequestDetails from '../SideBar/requestApprovedPendingResolved/request/RequestDetails';
import RequestList from '../SideBar/requestApprovedPendingResolved/request/RequestList';
// import Product1 from '../products/Product1';
// import Product2 from '../products/Product2';
// import Product3 from '../products/Product3';
import PageNotFound from '../PageNotFound';
import Success from '../success/Success';
import ProductDetails from '../products/ProductDetails';
import DropdownMenu from '../header/product_dropdown_menu/DropdownMenu';
// import About from './components/About';
// import Contact from './components/Contact';
// import Navigation from '../header/Navigation';
// import Category from '../Category';
import User from '../user/user';
import LoginForm from '../context/loginAuth/LoginForm';
import FaultDetails from '../SideBar/faults/FaultDetails';
import PrivateRoute from '../context/checkAuth/PrivateRoute';
import AuthenticationForm from '../context/loginAuth/AuthenticationForm';

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<DropdownMenu />} />
        <Route path="/products/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/test-auth" element={<AuthenticationForm />} />
        <Route path="/test" element={<Testfetchapi />} />
        {/* private ruoutes */}
        <Route element={<PrivateRoute />}>
          <Route path="/custodian" element={<CustodianLandingPage />} />
          {/* <Route path="/custodian/form" element={<CustodianForm />} /> */}
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/engineer" element={<Engineer />} />
          <Route path="/help-desk" element={<HelpDesk />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/human-resource" element={<HumanResource />} />
          <Route path="/inventory" element={<Inventory />} />
          {/* <Route path="/:dept/request-list" element={<RequestList />} /> */}
          <Route path="/request-details/:id" element={<RequestDetails />} />
          <Route path="/:dept/request-details/:id" element={<RequestDetails />} />
          <Route path="/:dept/fault-details/:id/request-details/:id" element={<RequestDetails />} />
          <Route path="/:dept/fault-details/" element={<RequestList />} />
          <Route path="/user/:id" element={<User />} />
          {/* <Route path="/fault-details" element={<FaultList />} /> */}
          <Route path="/:dept/fault-details/:id" element={<FaultDetails />} />
          <Route path="/success" element={<Success />} />
        </Route>
        {/* 404 error route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
