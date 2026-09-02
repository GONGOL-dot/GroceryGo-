import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  Globe,
  Moon,
  MapPin,
  Headphones,
  FileText,
  CreditCard,
  Ticket,
  Video,
} from "lucide-react";

import "../Styles/Nav.css";
import logo from "../pages/logo.png";

function Nav() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // 3 lines menu open / close
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Current selected language
  const languageNames = {
    en: "English",
    te: "తెలుగు",
    hi: "हिंदी",
    ta: "தமிழ்",
    kn: "ಕನ್ನಡ",
  };

  const currentLanguage =
    languageNames[i18n.language] || "English";

  return (
    <nav className="navbar">

      {/* LOGO */}
      <Link to="/home" className="nav-logo">
        <img
          src={logo}
          alt="GroceryGo Logo"
          className="logo-img"
        />

        <span className="logo-text"></span>
      </Link>


      {/* SEARCH */}
      <div className="search-box">
        <Search size={19} />

        <input
          type="text"
          placeholder={t("search")}
        />
      </div>


      {/* NAVIGATION LINKS */}
      <div className="nav-links">

        <Link to="/home">
          {t("home")}
        </Link>

        <Link to="/category">
          {t("category")}
        </Link>

        <Link to="/orders">
          {t("orders")}
        </Link>

        <Link to="/profile">
          {t("profile")}
        </Link>

      </div>


      {/* NAV ACTIONS */}
      <div className="nav-actions">

        {/* LOGIN */}
        <button
          className="nav-login"
          onClick={() => navigate("/login")}
        >
          <User size={18} />
          {t("login")}
        </button>


        {/* WISHLIST */}
        <button
          className="nav-icon-btn"
          onClick={() => navigate("/wishlist")}
        >
          <Heart size={20} />
          <span>{t("wishlist")}</span>
        </button>


        {/* CART */}
        <button
          className="nav-icon-btn"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart size={20} />
          <span>{t("cart")}</span>
        </button>


        {/* 3 LINES MENU */}
        <div className="menu-container">

          <button
            className="three-lines-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>


          {/* DROPDOWN */}
          {menuOpen && (
            <div className="dropdown-menu">

              <div className="menu-title">
                {t("quickMenu")}
              </div>


              {/* LANGUAGE */}
              <button
                className="menu-option"
                onClick={() =>
                  handleMenuNavigate("/language")
                }
              >
                <Globe size={19} />
                <span>{t("language")}</span>
                <small>{currentLanguage}</small>
              </button>


              {/* SCREEN MODE */}
              <button
                className="menu-option"
                onClick={() =>
                  handleMenuNavigate("/screen-mode")
                }
              >
                <Moon size={19} />
                <span>{t("screenMode")}</span>
              </button>


              {/* ADDRESS */}
              <button
                className="menu-option"
                onClick={() =>
                  handleMenuNavigate("/address")
                }
              >
                <MapPin size={19} />
                <span>{t("myAddress")}</span>
              </button>


              {/* NEED HELP */}
              <button
                className="menu-option"
                onClick={() =>
                  handleMenuNavigate("/need-help")
                }
              >
                <Headphones size={19} />
                <span>{t("needHelp")}</span>
              </button>


              {/* GST DETAILS */}
              <button
                className="menu-option"
                onClick={() =>
                  handleMenuNavigate("/gst-details")
                }
              >
                <FileText size={19} />
                <span>{t("gstDetails")}</span>
              </button>


              {/* PAYMENTS */}
              <button
                className="menu-option"
                onClick={() =>
                  handleMenuNavigate("/payments")
                }
              >
                <CreditCard size={19} />
                <span>{t("payments")}</span>
              </button>


              {/* COUPONS */}
              <button
                className="menu-option"
                onClick={() =>
                  handleMenuNavigate("/coupons")
                }
              >
                <Ticket size={19} />
                <span>{t("coupons")}</span>
              </button>


              {/* VIDEO CALL */}
              <button
                className="menu-option video-menu-option"
                onClick={() =>
                  handleMenuNavigate("/video-call")
                }
              >
                <Video size={19} />
                <span>{t("videoCallShopping")}</span>
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Nav;