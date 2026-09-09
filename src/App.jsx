import React, { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// ================= COMPONENTS =================
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import VoiceAssistant from "./Components/VoiceAssistant";
import SplashScreen from "./SplashScreen";

// ================= USER PAGES =================
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import Coupon from "./pages/Coupons";
import GSTDetails from "./pages/GSTDetails";
import Language from "./pages/Language";
import NeedHelp from "./pages/NeedHelp";
import OrderTracking from "./pages/OrderTracking";
import Otp from "./pages/Otp";
import Payment from "./pages/Payment";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import ScreenMode from "./pages/ScreenMode";
import VideoCall from "./pages/VideoCall";
import Address from "./pages/Address";

// ================= ADMIN PAGES =================
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminCategories from "./Admin/AdminCategories";
import AdminOrders from "./Admin/AdminOrders";
import AdminProducts from "./Admin/AdminProducts";
import AdminReports from "./Admin/AdminReports";
import AdminReviews from "./Admin/AdminReviews";
import AdminSettings from "./Admin/AdminSettings";
import AdminUsers from "./Admin/AdminUsers";
import DashboardHome from "./Admin/DashboardHome";


// =====================================================
// APP CONTENT
// =====================================================

function AppContent() {
  const location = useLocation();

  // Admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  // Login and Register pages lo
  // Nav, Footer, VoiceAssistant hide cheyyali
  const hideLayout =
    isAdminPage ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app">

      {/* ================= USER NAVBAR ================= */}

      {!hideLayout && <Nav />}


      {/* ================= MAIN CONTENT ================= */}

      <main className="main-content">

        <Routes>

          {/* =================================================
              USER ROUTES
          ================================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/home"
            element={<Home />}
          />

          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}

          <Route
            path="/register"
            element={<Register />}
          />

          {/* PROFILE */}

          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* CART */}

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* WISHLIST */}

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          {/* CATEGORY */}

          <Route
            path="/category"
            element={<Category />}
          />

          {/* SUB CATEGORY */}

          <Route
            path="/subcategory"
            element={<SubCategory />}
          />

          {/* PRODUCT DETAILS */}

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* SEARCH */}

          <Route
            path="/search"
            element={<SearchResults />}
          />

          {/* CHECKOUT */}

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* COUPON */}

          <Route
            path="/coupon"
            element={<Coupon />}
          />

          {/* PAYMENT */}

          <Route
            path="/payment"
            element={<Payment />}
          />

          {/* PAYMENTS */}

          <Route
            path="/payments"
            element={<Payments />}
          />

          {/* OTP */}

          <Route
            path="/otp"
            element={<Otp />}
          />

          {/* ADDRESS */}

          <Route
            path="/address"
            element={<Address />}
          />

          {/* =================================================
              USER ORDERS
          ================================================= */}

          <Route
            path="/orders"
            element={<OrderTracking />}
          />

          {/* ORDER TRACKING */}

          <Route
            path="/order-tracking"
            element={<OrderTracking />}
          />

          {/* GST DETAILS */}

          <Route
            path="/gst-details"
            element={<GSTDetails />}
          />

          {/* LANGUAGE */}

          <Route
            path="/language"
            element={<Language />}
          />

          {/* NEED HELP */}

          <Route
            path="/need-help"
            element={<NeedHelp />}
          />

          {/* SCREEN MODE */}

          <Route
            path="/screen-mode"
            element={<ScreenMode />}
          />

          {/* =================================================
              VIDEO CALL
          ================================================= */}

          <Route
            path="/video-call"
            element={<VideoCall />}
          />


          {/* =================================================
              ADMIN LOGIN
          ================================================= */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />


          {/* =================================================
              ADMIN DASHBOARD
          ================================================= */}

          <Route
            path="/admin"
            element={<AdminDashboard />}
          >

            {/* /admin → /admin/dashboard */}

            <Route
              index
              element={
                <Navigate
                  to="dashboard"
                  replace
                />
              }
            />

            {/* ADMIN DASHBOARD */}

            <Route
              path="dashboard"
              element={<DashboardHome />}
            />

            {/* ADMIN PRODUCTS */}

            <Route
              path="products"
              element={<AdminProducts />}
            />

            {/* ADMIN ORDERS */}

            <Route
              path="orders"
              element={<AdminOrders />}
            />

            {/* ADMIN USERS */}

            <Route
              path="users"
              element={<AdminUsers />}
            />

            {/* ADMIN CATEGORIES */}

            <Route
              path="categories"
              element={<AdminCategories />}
            />

            {/* ADMIN REVIEWS */}

            <Route
              path="reviews"
              element={<AdminReviews />}
            />

            {/* ADMIN SETTINGS */}

            <Route
              path="settings"
              element={<AdminSettings />}
            />

            {/* ADMIN REPORTS */}

            <Route
              path="reports"
              element={<AdminReports />}
            />

          </Route>


          {/* =================================================
              FALLBACK
          ================================================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

      </main>


      {/* ================= FOOTER ================= */}

      {!hideLayout && <Footer />}


      {/* ================= VOICE ASSISTANT ================= */}

      {!hideLayout && <VoiceAssistant />}

    </div>
  );
}


// =====================================================
// MAIN APP
// =====================================================

function App() {

  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>

      {showSplash ? (

        <SplashScreen
          onFinish={() => {
            setShowSplash(false);
          }}
        />

      ) : (

        <AppContent />

      )}

    </BrowserRouter>
  );
}


export default App;