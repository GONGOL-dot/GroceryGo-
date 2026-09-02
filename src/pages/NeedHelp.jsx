import React, { useState } from "react";
import "../Styles/QuickPages.css";

const NeedHelp = () => {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [showSupport, setShowSupport] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const issues = [
    "Order related issue",
    "Payment problem",
    "Delivery issue",
    "Product missing",
    "Refund issue",
    "Contact customer support",
  ];

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    setShowSupport(true);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter your issue.");
      return;
    }

    setSubmitted(true);
    setMessage("");
  };

  return (
    <div className="quick-page">
      <div className="quick-header">
        <button
          className="quick-back"
          onClick={() => window.history.back()}
        >
          ←
        </button>

        <h1>Need Help?</h1>
      </div>

      <div className="quick-card">
        {!showSupport ? (
          <>
            <h2>How can we help you?</h2>
            <p>Select an issue to get support.</p>

            <div className="quick-list">
              {issues.map((issue) => (
                <div
                  key={issue}
                  className="quick-item"
                  onClick={() => handleIssueClick(issue)}
                >
                  <span>{issue}</span>
                  <span>›</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              className="help-back-btn"
              onClick={() => {
                setShowSupport(false);
                setSelectedIssue("");
                setSubmitted(false);
              }}
            >
              ← Back to Help Topics
            </button>

            <h2>{selectedIssue}</h2>

            <p>
              Please describe your problem. Our customer support team will help
              you.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <textarea
                  className="quick-textarea"
                  placeholder="Describe your issue here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <button type="submit" className="quick-btn">
                  Submit Support Request
                </button>
              </form>
            ) : (
              <div className="support-success">
                <h3>✓ Support Request Submitted</h3>

                <p>
                  Your issue has been submitted successfully. Our customer
                  support team will contact you soon.
                </p>

                <button
                  className="quick-btn"
                  onClick={() => {
                    setShowSupport(false);
                    setSelectedIssue("");
                    setSubmitted(false);
                  }}
                >
                  Back to Help Center
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NeedHelp;