import React, { useEffect, useState } from "react";

const DashboardHome = () => {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://grocerygo-ecom.onrender.com/api/admindashboard"
      );

      if (!response.ok) {
        throw new Error("Failed to load dashboard");
      }

      const data = await response.json();

      setDashboard(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div className="dashboard-home">
      <h1>Dashboard</h1>
      <p>Welcome to GroceryGo Admin Panel</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Users</h3>
          <h2>{dashboard.totalUsers}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Products</h3>
          <h2>{dashboard.totalProducts}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Orders</h3>
          <h2>{dashboard.totalOrders}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Revenue</h3>
          <h2>₹{dashboard.totalRevenue}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;