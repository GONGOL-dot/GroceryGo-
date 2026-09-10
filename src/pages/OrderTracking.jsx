import React, { useEffect, useState } from "react";
import "../Styles/OrderTracking.css";

const steps = [
  "Order Confirmed",
  "Processing",
  "Out for Delivery",
  "Delivered",
];

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://grocerygo-ecom-eb51.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, []);

  const getCurrentStep = (status) => {
    const index = steps.findIndex(
      (step) => step.toLowerCase() === (status || "Order Confirmed").toLowerCase()
    );

    return index === -1 ? 0 : index;
  };

  return (
    <div className="orders-page">
      <h1>Order Tracking</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => {
          const currentStep = getCurrentStep(order.status);

          return (
            <div className="tracking-card" key={order.id}>
              
              <h2>
                Current Status: {order.status || "Order Confirmed"}
              </h2>

              <div className="tracking-flow">
                {steps.map((step, index) => (
                  <React.Fragment key={step}>
                    
                    <div className="step-wrapper">
                      <div
                        className={`step-circle ${
                          index <= currentStep ? "active" : ""
                        }`}
                      >
                        {index + 1}
                      </div>

                      <p>{step}</p>
                    </div>

                    {index < steps.length - 1 && (
                      <div
                        className={`step-line ${
                          index < currentStep ? "active-line" : ""
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {order.status === "Delivered" && (
                <h2 className="delivered-message">
                  🎉 Order Delivered Successfully!
                </h2>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;