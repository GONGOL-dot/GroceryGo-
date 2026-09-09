import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./AdminReports.css";

function AdminReports() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getReportData();
  }, []);

  const getReportData = async () => {
    try {
      const [usersResponse, productsResponse, ordersResponse] =
        await Promise.all([
          axios.get("https://grocerygo-ecom.onrender.com//users"),
          axios.get("https://grocerygo-ecom.onrender.com//products"),
          axios.get("https://grocerygo-ecom.onrender.com//orders"),
        ]);

      setUsers(usersResponse.data || []);
      setProducts(productsResponse.data || []);
      setOrders(ordersResponse.data || []);
    } catch (error) {
      console.error("Reports Error:", error);
    }
  };

  // TOTAL REVENUE
  const totalRevenue = orders.reduce((total, order) => {
    const amount =
      Number(order.total || order.amount || order.totalAmount || 0);

    return total + amount;
  }, 0);

  // TOTAL SALES
  const totalSales = orders.length;

  // TOP PRODUCTS
  const topProducts = products.slice(0, 5);

  return (
    <div className="admin-reports-page">

      {/* HEADER */}

      <div className="reports-header">

        <div className="reports-title-box">

          <button
            className="reports-back-btn"
            onClick={() => navigate("/admin")}
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1>Reports</h1>

            <p>
              View your grocery store performance
            </p>
          </div>

        </div>

        <button
          className="report-filter-btn"
          onClick={getReportData}
        >
          Refresh Report
        </button>

      </div>


      {/* REPORT CARDS */}

      <div className="reports-cards">

        {/* USERS */}

        <div className="report-card">

          <div className="report-card-icon">
            <FaUsers />
          </div>

          <h4>Total Users</h4>

          <h2>{users.length}</h2>

          <p>Registered customers</p>

        </div>


        {/* PRODUCTS */}

        <div className="report-card">

          <div className="report-card-icon">
            <FaBox />
          </div>

          <h4>Total Products</h4>

          <h2>{products.length}</h2>

          <p>Available products</p>

        </div>


        {/* ORDERS */}

        <div className="report-card">

          <div className="report-card-icon">
            <FaShoppingCart />
          </div>

          <h4>Total Orders</h4>

          <h2>{orders.length}</h2>

          <p>Orders received</p>

        </div>


        {/* REVENUE */}

        <div className="report-card">

          <div className="report-card-icon">
            <FaRupeeSign />
          </div>

          <h4>Total Revenue</h4>

          <h2>₹{totalRevenue.toLocaleString()}</h2>

          <p>Total earnings</p>

        </div>

      </div>


      {/* REPORT CONTENT */}

      <div className="reports-content">


        {/* SALES OVERVIEW */}

        <div className="report-chart-box">

          <h2>Sales Overview</h2>

          <p>
            Overall store sales performance
          </p>

          <div className="chart-placeholder">

            Total Orders: {totalSales}

          </div>

        </div>


        {/* TOP PRODUCTS */}

        <div className="top-products-box">

          <h2>Top Products</h2>

          {topProducts.length > 0 ? (

            topProducts.map((product, index) => (

              <div
                className="top-product-item"
                key={product.id}
              >

                <div className="top-product-name">

                  <div className="top-product-number">
                    {index + 1}
                  </div>

                  <h4>
                    {product.name ||
                      product.productName ||
                      "Product"}
                  </h4>

                </div>


                <div className="top-product-sales">

                  ₹
                  {Number(
                    product.price || 0
                  ).toLocaleString()}

                </div>

              </div>

            ))

          ) : (

            <p>No products available</p>

          )}

        </div>

      </div>


      {/* ORDERS TABLE */}

      <div className="reports-table-container">

        <h2>Recent Orders</h2>

        <table className="reports-table">

          <thead>

            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>

          </thead>


          <tbody>

            {orders.length > 0 ? (

              orders
                .slice(0, 10)
                .map((order) => (

                  <tr key={order.id}>

                    <td>
                      #{order.id}
                    </td>


                    <td>
                      {order.customer ||
                        order.customerName ||
                        order.userName ||
                        "Customer"}
                    </td>


                    <td>
                      ₹
                      {Number(
                        order.total ||
                          order.amount ||
                          order.totalAmount ||
                          0
                      ).toLocaleString()}
                    </td>


                    <td>

                      <span
                        className={`report-status ${(
                          order.status ||
                          "pending"
                        ).toLowerCase()}`}
                      >

                        {order.status ||
                          "Pending"}

                      </span>

                    </td>

                  </tr>

                ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No Orders Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminReports;