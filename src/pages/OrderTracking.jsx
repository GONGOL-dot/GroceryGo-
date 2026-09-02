import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../Styles/OrderTracking.css";

function OrderTracking() {
  const { cartItems = [] } = useCart();

  // 1 = Order Placed
  // 2 = Processing
  // 3 = Out for Delivery
  // 4 = Delivered
  const [currentStep, setCurrentStep] = useState(1);

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  const getStatusText = () => {
    if (currentStep === 1) return "Order Confirmed";
    if (currentStep === 2) return "Processing";
    if (currentStep === 3) return "Out for Delivery";
    if (currentStep === 4) return "Delivered";
  };

  if (cartItems.length === 0) {
    return (
      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track your grocery orders</p>
        </div>

        <div className="empty-orders">
          <h2>No Orders Found</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">

      {/* PAGE HEADER */}
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track your grocery orders</p>
      </div>

      {/* ORDER CARD */}
      <div className="order-card">

        {/* ORDER TOP */}
        <div className="order-top">
          <div>
            <h2>Order #1001</h2>
            <p>Order placed successfully</p>
          </div>

          <span className="order-status">
            {getStatusText()}
          </span>
        </div>

        {/* ORDER ITEMS */}
        <div className="order-items">

          {cartItems.map((item) => (
            <div className="order-item" key={item.id}>

              <img
                src={item.image}
                alt={item.name}
                className="order-product-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div className="order-item-details">
                <h3>{item.name}</h3>

                <p>
                  Category: {item.category || "Groceries"}
                </p>

                <p>
                  Price: ₹{item.price}
                </p>

                <p>
                  Quantity: {item.quantity || 1}
                </p>
              </div>

              <div className="order-item-total">
                ₹{Number(item.price || 0) * (item.quantity || 1)}
              </div>

            </div>
          ))}

        </div>

        {/* ORDER TOTAL */}
        <div className="order-bottom">

          <div>
            <p>Total Items</p>
            <strong>{totalItems}</strong>
          </div>

          <div className="total-amount-box">
            <p>Total Amount</p>
            <strong>₹{totalAmount}</strong>
          </div>

        </div>

        {/* DELIVERY STATUS */}
        <div className="delivery-title">
          Delivery Status
        </div>

        {/* TRACKING */}
        <div className="tracking-status">

          {/* STEP 1 */}
          <div className="track-step active">
            <span>1</span>
            <p>Order Placed</p>
          </div>

          <div
            className={`track-line ${
              currentStep >= 2 ? "active-line" : ""
            }`}
          ></div>

          {/* STEP 2 */}
          <div
            className={`track-step ${
              currentStep >= 2 ? "active" : ""
            }`}
          >
            <span>2</span>
            <p>Processing</p>
          </div>

          <div
            className={`track-line ${
              currentStep >= 3 ? "active-line" : ""
            }`}
          ></div>

          {/* STEP 3 */}
          <div
            className={`track-step ${
              currentStep >= 3 ? "active" : ""
            }`}
          >
            <span>3</span>
            <p>Out for Delivery</p>
          </div>

          <div
            className={`track-line ${
              currentStep >= 4 ? "active-line" : ""
            }`}
          ></div>

          {/* STEP 4 */}
          <div
            className={`track-step ${
              currentStep >= 4 ? "active" : ""
            }`}
          >
            <span>4</span>
            <p>Delivered</p>
          </div>

        </div>

        {/* DEMO BUTTONS */}
        <div className="tracking-buttons">

          {currentStep < 2 && (
            <button onClick={() => setCurrentStep(2)}>
              Start Processing
            </button>
          )}

          {currentStep === 2 && (
            <button onClick={() => setCurrentStep(3)}>
              Out for Delivery
            </button>
          )}

          {currentStep === 3 && (
            <button onClick={() => setCurrentStep(4)}>
              Mark as Delivered
            </button>
          )}

          {currentStep === 4 && (
            <div className="delivered-message">
              🎉 Your order has been delivered successfully!
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default OrderTracking;