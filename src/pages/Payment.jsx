import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../Styles/Payment.css";

function Payment() {
  const navigate = useNavigate();
  const { cartItems = [] } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("");

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  const handleContinue = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    navigate("/otp", {
      state: {
        paymentMethod,
        totalAmount,
      },
    });
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment Method</h1>

        <p className="payment-subtitle">
          Choose your preferred payment method
        </p>

        <div className="payment-total">
          <span>Total Amount</span>
          <strong>₹{totalAmount}</strong>
        </div>

        <div className="payment-methods">

          <div
            className={`payment-option ${
              paymentMethod === "UPI" ? "selected" : ""
            }`}
            onClick={() => setPaymentMethod("UPI")}
          >
            <input
              type="radio"
              checked={paymentMethod === "UPI"}
              onChange={() => setPaymentMethod("UPI")}
            />

            <div>
              <h3>UPI Payment</h3>
              <p>Google Pay, PhonePe, Paytm</p>
            </div>
          </div>

          <div
            className={`payment-option ${
              paymentMethod === "Card" ? "selected" : ""
            }`}
            onClick={() => setPaymentMethod("Card")}
          >
            <input
              type="radio"
              checked={paymentMethod === "Card"}
              onChange={() => setPaymentMethod("Card")}
            />

            <div>
              <h3>Credit / Debit Card</h3>
              <p>Pay securely using your card</p>
            </div>
          </div>

          <div
            className={`payment-option ${
              paymentMethod === "Cash on Delivery"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setPaymentMethod("Cash on Delivery")
            }
          >
            <input
              type="radio"
              checked={
                paymentMethod === "Cash on Delivery"
              }
              onChange={() =>
                setPaymentMethod("Cash on Delivery")
              }
            />

            <div>
              <h3>Cash on Delivery</h3>
              <p>Pay when your order arrives</p>
            </div>
          </div>

        </div>

        <button
          className="payment-continue-btn"
          onClick={handleContinue}
        >
          Continue to OTP
        </button>
      </div>
    </div>
  );
}

export default Payment;