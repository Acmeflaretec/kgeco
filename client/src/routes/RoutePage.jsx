import { Route, Routes } from "react-router-dom";

import About from "../pages/About";
import Allproducts from "../pages/Allproducts";
import Blogs from "../pages/Blogs";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ManageAddress from "../pages/ManageAddress";
import Orders from "../pages/Orders";
import PageNotFound from "../pages/PageNotFound";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import ProfileInfo from "../pages/ProfileInfo";
import Register from "../pages/Register";
import SingleOrder from "../pages/SingleOrder";
import Wishlist from "../pages/Wishlist";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import ScrollToTop from "../ScrollToTop";

import CancellationRefunds from "../pages/CancellationRefunds";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ReturnPolicy from "../pages/ReturnPolicy";
import StorePolicy from "../pages/StorePolicy";
import TermsOfService from "../pages/TermsOfServicce";

// user only routes
import UserPrivateRoute from "./UserPrivateRoute";
import { PersistGate } from "redux-persist/integration/react";
function RoutePage() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allproducts" element={<Allproducts />} />
            <Route path="/product/:proId" element={<Product />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/cancellation" element={<CancellationRefunds />} />
            <Route path="/returnpolicy" element={<ReturnPolicy />} />
            <Route path="/storepolicy" element={<StorePolicy />} />
            <Route path="/termsofservice" element={<TermsOfService />} />

            {/* Protected Routes */}
            <Route element={<UserPrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profileinfo" element={<ProfileInfo />} />
              <Route path="/manageaddress" element={<ManageAddress />} />
              <Route path="/order" element={<Orders />} />
              <Route path="/ordertrack/:orderId" element={<SingleOrder />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default RoutePage;
