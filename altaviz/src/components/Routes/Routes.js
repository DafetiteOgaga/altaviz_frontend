import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import About from '../main/About';
// import Products from '../main/Products';
import ContactUs from '../main/ContactUs';
import Testfetchapi from '../Testfetchapi';
// import Custodian from '../SideBar/custodian/Custodian';
// import CustodianForm from '../SideBar/custodian/CustodianForm';
import CustodianLandingPage from '../SideBar/custodian/CustodianLandingPage';
import Workshop from '../SideBar/workshop/Workshop';
import Engineer from '../SideBar/engineer/Engineer';
import HelpDesk from '../SideBar/help_desk/HelpDesk';
import Supervisor from '../SideBar/supervisor/Supervisor';
import HumanResource from '../SideBar/human_resource/HumanResource';
import RequestDetails from '../SideBar/requestApprovedPendingResolved/request/RequestDetails';
// import RequestList from '../SideBar/requestApprovedPendingResolved/request/RequestList';
// import Product1 from '../products/Product1';
// import Product2 from '../products/Product2';
// import Product3 from '../products/Product3';
import PageNotFound from '../PageNotFound';
import Success from '../success/Success';
import ProductDetails from '../products/ProductDetails';
import DropdownMenu from '../header/DropdownMenu';
// import About from './components/About';
// import Contact from './components/Contact';
// import Navigation from '../header/Navigation';
// import Category from '../Category';
import User from '../user/user';
import Fault from '../SideBar/Fault';

function AppRoutes() {
  function getImages(r) {
		return r.keys().map(r);
	}
	const images = getImages(require.context('../product_images/', false, /\.(png|jpe?g|svg)$/));
  const titles = [
		'H22V series',
		'H68NL Series Intelligent Cash Recycler',
		'grg-200-v-sorting-machine',
		'H34 series',
	]
	const descriptions = [
		'description1',
		'description2',
		'description3',
		'description4',
	]
	const products = images.map((image, index) => {
		// console.log('index', index, 'title', titles[index] , 'descriptions', descriptions[index], 'image', image)
		return ({
			title: titles[index],
            description: descriptions[index],
            image: image,
		})});

  // console.log('products (ROUTES):', products);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<DropdownMenu products={products} />} />
        <Route path="/products/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/custodian" element={<CustodianLandingPage />} />
        {/* <Route path="/custodian/form" element={<CustodianForm />} /> */}
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/engineer" element={<Engineer />} />
        <Route path="/help-desk" element={<HelpDesk />} />
        <Route path="/supervisor" element={<Supervisor />} />
        <Route path="/human-resource" element={<HumanResource />} />
        {/* <Route path="/:dept/request-list" element={<RequestList />} /> */}
        <Route path="/request-details/:id" element={<RequestDetails />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/fault-details/:id" element={<Fault />} />
        <Route path="/success" element={<Success />} />
        <Route path="/test" element={<Testfetchapi />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
