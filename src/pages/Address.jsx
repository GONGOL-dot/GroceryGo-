import React, { useState } from "react";
import "../Styles/QuickPages.css";

const Address = () => {
  const [saved, setSaved] = useState(false);

  const saveAddress = () => {
    setSaved(true);
  };

  return (
    <div className="quick-page">
      <div className="quick-header">
        <button className="quick-back" onClick={() => window.history.back()}>
          ←
        </button>
        <h1>My Address</h1>
      </div>

      <div className="quick-card">
        <h2>Delivery Address</h2>
        <p>Add your address for faster grocery delivery.</p>

        <input className="quick-input" placeholder="Full Name" />
        <input className="quick-input" placeholder="Phone Number" />
        <input className="quick-input" placeholder="House / Flat Number" />
        <input className="quick-input" placeholder="Street / Area" />
        <input className="quick-input" placeholder="City" />
        <input className="quick-input" placeholder="Pincode" />

        <button className="quick-btn" onClick={saveAddress}>
          Save Address
        </button>

        {saved && (
          <p className="quick-success">✓ Address saved successfully!</p>
        )}
      </div>
    </div>
  );
};

export default Address;