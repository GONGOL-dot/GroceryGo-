import React, { useState } from "react";
import "../Styles/QuickPages.css";

const GSTDetails = () => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="quick-page">
      <div className="quick-header">
        <button className="quick-back" onClick={() => window.history.back()}>
          ←
        </button>
        <h1>GST Details</h1>
      </div>

      <div className="quick-card">
        <h2>Add GST Information</h2>
        <p>Add GST details for business invoices.</p>

        <input
          className="quick-input"
          placeholder="Business Name"
        />

        <input
          className="quick-input"
          placeholder="GST Number"
        />

        <input
          className="quick-input"
          placeholder="Business Address"
        />

        <button
          className="quick-btn"
          onClick={() => setSaved(true)}
        >
          Save GST Details
        </button>

        {saved && (
          <p className="quick-success">
            ✓ GST details saved successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default GSTDetails;