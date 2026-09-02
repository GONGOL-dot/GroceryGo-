import React, { useState } from "react";
import "../Styles/QuickPages.css";

const Coupons = () => {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");

  const applyCoupon = () => {
    if (coupon.trim() === "") {
      setMessage("Please enter a coupon code.");
      return;
    }

    setMessage(`✓ Coupon "${coupon}" applied successfully!`);
  };

  return (
    <div className="quick-page">
      <div className="quick-header">
        <button className="quick-back" onClick={() => window.history.back()}>
          ←
        </button>
        <h1>Coupons</h1>
      </div>

      <div className="quick-card">
        <h2>Apply Coupon</h2>

        <input
          className="quick-input"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />

        <button
          className="quick-btn"
          onClick={applyCoupon}
        >
          Apply Coupon
        </button>

        {message && (
          <p className="quick-success">{message}</p>
        )}

        <div className="quick-list">
          <div className="quick-item">
            SAVE20
            <span>20% OFF</span>
          </div>

          <div className="quick-item">
            GROCERY50
            <span>₹50 OFF</span>
          </div>

          <div className="quick-item">
            FIRSTORDER
            <span>Special Offer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;