import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "⌂",
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: "▣",
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: "🛒",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "👥",
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: "🏷",
    },
    {
      name: "Reviews",
      path: "/admin/reviews",
      icon: "★",
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: "⚙",
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleBackToWebsite = () => {
    navigate("/");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-layout">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="admin-sidebar">

        {/* BACK TO WEBSITE */}

        <button
          className="back-button"
          onClick={handleBackToWebsite}
          title="Back to Website"
          type="button"
        >
          ←
        </button>


        {/* LOGO */}

        <div className="admin-logo">
          <h1>GroceryGo</h1>
          <p>Admin Panel</p>
        </div>


        {/* MENU */}

        <div className="admin-menu">

          {menuItems.map((item) => {

            const isActive =
              location.pathname === item.path;

            return (
              <button
                key={item.name}
                type="button"
                className={`menu-item ${
                  isActive ? "active" : ""
                }`}
                onClick={() =>
                  handleMenuClick(item.path)
                }
              >

                <span className="menu-icon">
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>

              </button>
            );
          })}

        </div>


        {/* LOGOUT */}

        <button
          className="logout-button"
          onClick={handleLogout}
          type="button"
        >
          <span>↪</span>
          <span>Logout</span>
        </button>

      </aside>


      {/* =====================================
          MAIN ADMIN CONTENT
      ===================================== */}

      <main className="admin-main">

        <Outlet />

      </main>

    </div>
  );
}

export default AdminDashboard;