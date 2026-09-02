import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/orders"
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:3000/orders/${id}`,
        { status }
      );

      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-orders">

      <h1>Manage Orders</h1>
      <p>Track and manage customer orders.</p>

      <div className="orders-container">

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>

                <td>#{order.id}</td>

                <td>
                  {order.name || "Customer"}
                </td>

                <td>
                  ₹{order.total || 0}
                </td>

                <td>
                  <span className="order-status">
                    {order.status || "Pending"}
                  </span>
                </td>

                <td>
                  <select
                    value={order.status || "Pending"}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default AdminOrders;