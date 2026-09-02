import React, { useState } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// ================= COMPONENTS =================
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import VoiceAssistant from "./Components/VoiceAssistant";
import "./Components/VoiceAssistant.css";
import SplashScreen from "./SplashScreen";

// ================= PAGES =================
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import OrderTracking from "./pages/OrderTracking";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Payment from "./pages/Payment";
import Otp from "./pages/Otp";

// ================= MENU PAGES =================
import Language from "./pages/Language";
import ScreenMode from "./pages/ScreenMode";
import Address from "./pages/Address";
import NeedHelp from "./pages/NeedHelp";
import GSTDetails from "./pages/GSTDetails";
import Payments from "./pages/Payments";
import Coupons from "./pages/Coupons";
import VideoCall from "./pages/VideoCall";

// ================= ADMIN =================
import AdminDashboard from "./Admin/AdminDashboard";
import DashboardHome from "./Admin/DashboardHome";
import AdminUsers from "./Admin/AdminUsers";
import AdminProducts from "./Admin/AdminProducts";
import AdminOrders from "./Admin/AdminOrders";
import AdminCategories from "./Admin/AdminCategories";
import AdminReviews from "./Admin/AdminReviews";
import AdminReports from "./Admin/AdminReports";
import AdminSettings from "./Admin/AdminSettings";

// ================= CART CONTEXT =================
import { CartProvider } from "./context/CartContext";


function AppContent() {

  const [showSplash, setShowSplash] = useState(true);

  const location = useLocation();

  // ================= HIDE NAVBAR FOOTER AI =================

  const hideNavFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");


  // ================= SPLASH SCREEN =================

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => setShowSplash(false)}
      />
    );
  }


  return (
    <>

      {/* ================= NAVBAR ================= */}

      {!hideNavFooter && <Nav />}


      {/* ================= ROUTES ================= */}

      <Routes>

        {/* ================= USER ROUTES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/orders"
          element={<OrderTracking />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/category"
          element={<Category />}
        />

        <Route
          path="/category/:categoryName"
          element={<SubCategory />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/otp"
          element={<Otp />}
        />


        {/* ================= QUICK MENU ================= */}

        <Route
          path="/language"
          element={<Language />}
        />

        <Route
          path="/screen-mode"
          element={<ScreenMode />}
        />

        <Route
          path="/address"
          element={<Address />}
        />

        <Route
          path="/need-help"
          element={<NeedHelp />}
        />

        <Route
          path="/gst-details"
          element={<GSTDetails />}
        />

        <Route
          path="/payments"
          element={<Payments />}
        />

        <Route
          path="/coupons"
          element={<Coupons />}
        />

        <Route
          path="/video-call"
          element={<VideoCall />}
        />


        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        >

          <Route
            index
            element={<DashboardHome />}
          />

          <Route
            path="dashboard"
            element={<DashboardHome />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          <Route
            path="categories"
            element={<AdminCategories />}
          />

          <Route
            path="reviews"
            element={<AdminReviews />}
          />

          <Route
            path="reports"
            element={<AdminReports />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />

        </Route>


        {/* ================= DEFAULT ================= */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>


      {/* ================= AI VOICE ASSISTANT ================= */}

      {!hideNavFooter && <VoiceAssistant />}


      {/* ================= FOOTER ================= */}

      {!hideNavFooter && <Footer />}

    </>
  );
}


// ================= MAIN APP =================

function App() {

  return (

    <CartProvider>

      <AppContent />

    </CartProvider>

  );

}

export default App;