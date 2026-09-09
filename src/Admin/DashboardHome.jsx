import React, { useEffect, useState } from "react";
import "./DashboardHome.css";

function DashboardHome() {
  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= LOAD DASHBOARD =================

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [dashboardResponse, ordersResponse, usersResponse] =
        await Promise.all([
          fetch(
            "https://grocerygo-ecom-eb51.onrender.com/api/admin/dashboard"
          ),
          fetch("https://grocerygo-ecom-eb51.onrender.com/orders"),
          fetch("https://grocerygo-ecom-eb51.onrender.com/users"),
        ]);

      if (!dashboardResponse.ok) {
        throw new Error("Failed to load dashboard");
      }

      const dashboardData = await dashboardResponse.json();
      const ordersData = await ordersResponse.json();
      const usersData = await usersResponse.json();

      setDashboard({
        totalProducts: dashboardData.totalProducts || 0,
        totalOrders: dashboardData.totalOrders || 0,
        totalUsers: usersData.length || 0,
        totalRevenue: dashboardData.totalRevenue || 0,
      });

      // Latest 4 orders
      const latestOrders = Array.isArray(ordersData)
        ? ordersData.slice(-4).reverse()
        : [];

      setRecentOrders(latestOrders);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= DOWNLOAD REPORT =================

  const handleDownloadReport = () => {
    const ordersText = recentOrders
      .map(
        (order) => `
Order ID: #${order.orderId || order.id || "N/A"}
Customer: ${order.customerName || order.userName || "Customer"}
Amount: ₹${order.totalAmount || 0}
Status: ${order.status || "Order Confirmed"}
`
      )
      .join("\n");

    const report = `
GROCERYGO ADMIN REPORT
======================

Total Products: ${dashboard.totalProducts}
Total Orders: ${dashboard.totalOrders}
Total Users: ${dashboard.totalUsers}
Total Revenue: ₹${dashboard.totalRevenue}

RECENT ORDERS
======================

${ordersText}

Generated Date: ${new Date().toLocaleString()}

Thank you for using GroceryGo Admin Panel.
`;

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "GroceryGo-Admin-Report.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="dashboard-home">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  // ================= DASHBOARD =================

  return (
    <div className="dashboard-home">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <button
          className="report-button"
          onClick={handleDownloadReport}
        >
          Download Report
        </button>

      </div>

      {/* STAT CARDS */}

      <div className="stats-container">

        {/* PRODUCTS */}

        <div className="stat-card">

          <div className="stat-icon">
            📦
          </div>

          <div>
            <p>Total Products</p>

            <h2>
              {dashboard.totalProducts}
            </h2>

            <span>
              Available products
            </span>
          </div>

        </div>

        {/* ORDERS */}

        <div className="stat-card">

          <div className="stat-icon">
            🛒
          </div>

          <div>
            <p>Total Orders</p>

            <h2>
              {dashboard.totalOrders}
            </h2>

            <span>
              Customer orders
            </span>
          </div>

        </div>

        {/* USERS */}

        <div className="stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>
            <p>Total Users</p>

            <h2>
              {dashboard.totalUsers}
            </h2>

            <span>
              Registered users
            </span>
          </div>

        </div>

        {/* REVENUE */}

        <div className="stat-card">

          <div className="stat-icon">
            💰
          </div>

          <div>
            <p>Total Revenue</p>

            <h2>
              ₹{dashboard.totalRevenue}
            </h2>

            <span>
              Total earnings
            </span>
          </div>

        </div>

      </div>

      {/* RECENT ORDERS */}

      <div className="recent-orders">

        <h2>
          Recent Orders
        </h2>

        <table>

          <thead>

            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {recentOrders.length === 0 ? (

              <tr>
                <td colSpan="4">
                  No orders available
                </td>
              </tr>

            ) : (

              recentOrders.map((order) => (

                <tr key={order.id || order.orderId}>

                  <td>
                    #{order.orderId || order.id}
                  </td>

                  <td>
                    {order.customerName ||
                      order.userName ||
                      "Customer"}
                  </td>

                  <td>
                    ₹{order.totalAmount || 0}
                  </td>

                  <td>

                    <span className="status confirmed">
                      {order.status || "Order Confirmed"}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DashboardHome;