import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "⌂" },
    { name: "Products", path: "/admin/products", icon: "▣" },
    { name: "Orders", path: "/admin/orders", icon: "🛒" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Categories", path: "/admin/categories", icon: "🏷" },
    { name: "Reviews", path: "/admin/reviews", icon: "★" },
    { name: "Settings", path: "/admin/settings", icon: "⚙" },
  ];

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        {/* BACK TO WEBSITE */}
        <button
          className="back-button"
          onClick={() => navigate("/")}
          title="Back to Website"
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

          {menuItems.map((item) => (

            <button
              key={item.name}
              className={`menu-item ${
                location.pathname === item.path ||
                (item.name === "Dashboard" && location.pathname === "/admin")
                  ? "active"
                  : ""
              }`}
              onClick={() => navigate(item.path)}
            >

              <span className="menu-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </button>

          ))}

        </div>

        {/* LOGOUT */}
        <button
          className="logout-button"
          onClick={() => navigate("/")}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>

      {/* PAGE CONTENT */}
      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminDashboard;