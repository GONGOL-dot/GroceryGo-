import React from "react";
import "../Styles/QuickPages.css";

const Payments = () => {
  const paymentOptions = [
    "💳 Credit / Debit Card",
    "📱 UPI Payment",
    "🏦 Net Banking",
    "💵 Cash on Delivery"
  ];

  return (
    <div className="quick-page">
      <div className="quick-header">
        <button className="quick-back" onClick={() => window.history.back()}>
          ←
        </button>
        <h1>Payments</h1>
      </div>

      <div className="quick-card">
        <h2>Payment Methods</h2>
        <p>Select your preferred payment method.</p>

        <div className="quick-list">
          {paymentOptions.map((item) => (
            <div
              className="quick-item"
              key={item}
              onClick={() => alert(`${item} selected`)}
            >
              {item}
              <span>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;