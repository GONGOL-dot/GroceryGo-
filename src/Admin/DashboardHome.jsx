import React from "react";
import "./DashboardHome.css";

function DashboardHome() {

  // ================= DOWNLOAD REPORT =================

  const handleDownloadReport = () => {

    const report = `
GROCERYGO ADMIN REPORT
======================

Total Products: 10
Total Orders: 6
Total Users: 2
Total Revenue: ₹0

RECENT ORDERS
======================

Order ID: #V-ue1M_EpYs
Customer: Customer
Amount: ₹0
Status: Order Confirmed

Order ID: #LVSJQ4ojHD
Customer: Customer
Amount: ₹0
Status: Order Confirmed

Order ID: #0z4ZYfIVKcA
Customer: Customer
Amount: ₹0
Status: Order Confirmed

Order ID: #kqDeUZgShDI
Customer: Customer
Amount: ₹0
Status: Order Confirmed

Generated Date: ${new Date().toLocaleString()}

Thank you for using GroceryGo Admin Panel.
`;

    const blob = new Blob(
      [report],
      {
        type: "text/plain"
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "GroceryGo-Admin-Report.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };


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

            <h2>10</h2>

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

            <h2>6</h2>

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

            <h2>2</h2>

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

            <h2>₹0</h2>

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


            <tr>

              <td>#V-ue1M_EpYs</td>

              <td>Customer</td>

              <td>₹0</td>

              <td>

                <span className="status confirmed">
                  Order Confirmed
                </span>

              </td>

            </tr>


            <tr>

              <td>#LVSJQ4ojHD</td>

              <td>Customer</td>

              <td>₹0</td>

              <td>

                <span className="status confirmed">
                  Order Confirmed
                </span>

              </td>

            </tr>


            <tr>

              <td>#0z4ZYfIVKcA</td>

              <td>Customer</td>

              <td>₹0</td>

              <td>

                <span className="status confirmed">
                  Order Confirmed
                </span>

              </td>

            </tr>


            <tr>

              <td>#kqDeUZgShDI</td>

              <td>Customer</td>

              <td>₹0</td>

              <td>

                <span className="status confirmed">
                  Order Confirmed
                </span>

              </td>

            </tr>


          </tbody>

        </table>

      </div>

    </div>

  );
}

export default DashboardHome;