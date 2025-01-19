import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import About from '../main/about/About';
import ContactUs from '../main/contact_us/ContactUs';
import Testfetchapi from '../Testfetchapi';
import Custodian from '../SideBar/custodian/Custodian';
import Workshop from '../SideBar/workshop/Workshop';
import Engineer from '../SideBar/engineer/Engineer';
import HelpDesk from '../SideBar/help_desk/HelpDesk';
import Supervisor from '../SideBar/supervisor/Supervisor';
import HumanResource from '../SideBar/human_resource/HumanResource';
import Inventory from '../SideBar/human_resource/inventory/Inventory';
import PageNotFound from '../PageNotFound';
import Success from '../success/Success';
import Blank from '../success/blank';
import ProductDetails from '../products/ProductDetails';
import DropdownMenu from '../header/product_dropdown_menu/DropdownMenu';
import User from '../user/user';
import LoginForm from '../context/loginAuth/LoginForm';
import PasswordResetRequest from '../context/loginAuth/PasswordResetRequest';
import PasswordRestConfirm from '../context/loginAuth/PasswordRestConfirm';
// import CheckResetLink from '../context/loginAuth/CheckResetLink';
import PasswordUpdateReset from '../success/PasswordUpdateReset';
import PrivateRoute from '../context/checkAuth/PrivateRoute';
import AuthenticationForm from '../context/loginAuth/AuthenticationForm';
import DetailsUpdate from '../SideBar/faults/forEngineers/detailsUpdate';
import FaultDetailsGen from '../SideBar/faults/GenFaults/FaultDetailsGen';
import FaultListGen from '../SideBar/faults/GenFaults/FaultListGen';
import RequestsDetails from '../SideBar/Requests/RequestsDetails';
import RequestsList from '../SideBar/Requests/RequestsList';
import UserProcessedList from '../SideBar/faults/forEngineers/UserProcessedList';
import EngineerToLocation from '../SideBar/faults/forEngineers/engineerToLocation';
import Profile from '../profile/Profile';
import ChatRoom from '../SideBar/chatsSetup/ChatRoom';
import LoginDetails from '../SideBar/sidebarComponent/loginDetails';

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
        <Route path="/login/password-reset" element={<PasswordResetRequest />} />
        <Route path="/reset-password/:uid/:timer/:token" element={<PasswordRestConfirm />} />
        <Route path="/reset-update-password/" element={<PasswordUpdateReset />} />
        <Route path="/login-details" element={<LoginDetails />} />
        <Route path="/test-auth" element={<AuthenticationForm />} />
        <Route path="/test" element={<Testfetchapi />} />
        {/* private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/custodian" element={<Custodian />} />
          {/* <Route path="/custodian/form" element={<CustodianForm />} /> */}
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/engineer" element={<Engineer />} />
          <Route path="/help-desk" element={<HelpDesk />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/human-resource" element={<HumanResource />} />
          <Route path="/inventory" element={<Inventory />} />

          {/* faults */}
          <Route path="/:dept/fault-list" element={<FaultListGen />} />
          <Route path="/:dept/fault-details/:id" element={<FaultDetailsGen />} />
          <Route path="/:dept/fault-list/fault-details/:id" element={<FaultDetailsGen />} />

          {/* gen faults */}
          <Route path="/:dept/:type/fault-gen-list" element={<FaultListGen />} />
          <Route path="/:dept/:type/fault-gen-details/:id" element={<FaultDetailsGen />} />
          <Route path="/:dept/:type/fault-gen-list/fault-gen-details/:id" element={<FaultDetailsGen />} />

          <Route path="/:dept/fault-gen-list" element={<FaultListGen />} />
          <Route path="/:dept/fault-gen-details/:id" element={<FaultDetailsGen />} />
          <Route path="/:dept/fault-gen-list/fault-gen-details/:id" element={<FaultDetailsGen />} />

          {/* compRequests */}
          <Route path="/:dept/component-request-list" element={<RequestsList />} />
          <Route path="/:dept/component-request-details/:id" element={<RequestsDetails />} />
          <Route path="/:dept/component-request-list/component-request-details/:id" element={<RequestsDetails />} />
          <Route path="/:dept/component-request-details/:faultID/:id" element={<RequestsDetails />} />

          {/* partRequests */}
          <Route path="/:dept/part-request-list" element={<RequestsList />} />
          <Route path="/:dept/part-request-details/:id" element={<RequestsDetails />} />
          <Route path="/:dept/part-request-list/part-request-details/:id" element={<RequestsDetails />} />
          <Route path="/:dept/part-request-details/:faultID/:id" element={<RequestsDetails />} />
          <Route path="/:dept/requestSearch-request-details/:computedID/:itemName/:id" element={<RequestsDetails />} />
          {/* fixed parts */}
          <Route path="/:dept/part-fixed-details/:id" element={<RequestsDetails />} />
          <Route path="/:dept/part-request-list/part-fixed-details/:id" element={<RequestsDetails />} />

          {/* UserProcessedList */}
          <Route path="/:dept/user-list/:context/:id" element={<FaultListGen />} />
          <Route path="/:dept/user-list/:context/:id/fault-gen-details/:id" element={<FaultDetailsGen />} />
          <Route path="/:dept/user/:context" element={<UserProcessedList />} />
          <Route path="/:dept/user/:context/user-list/:id" element={<FaultListGen />} />
          <Route path="/:dept/user/:context/user-list/:id/fault-gen-details/:id" element={<FaultDetailsGen />} />

           {/* details update and user */}
          <Route path="/user/:id" element={<User />} />
          <Route path="/:dept/update-details/:id/:updateID" element={<DetailsUpdate />} />
          <Route path="/:dept/update/:context" element={<UserProcessedList />} />

          {/* assign engineer to location */}
          <Route path=":dept/new-location-list" element={<EngineerToLocation />} />

          <Route path="/success" element={<Success />} />
          <Route path="/blank" element={<Blank />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* 404 error route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
