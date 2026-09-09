import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../Styles/Otp.css";

function Otp() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems = [] } = useCart();

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const paymentMethod =
    location.state?.paymentMethod || "";

  const totalAmount =
    location.state?.totalAmount || 0;

  useEffect(() => {
    const newOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setGeneratedOtp(newOtp);

    // Demo project OTP
    alert(`Your OTP is: ${newOtp}`);
  }, []);

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6 digit OTP");
      return;
    }

    if (otp !== generatedOtp) {
      alert("Incorrect OTP");
      return;
    }

    try {
      const orderData = {
        orderId: `ORD${Date.now()}`,
        items: cartItems,
        totalAmount,
        paymentMethod,
        status: "Order Confirmed",
        createdAt: new Date().toLocaleString(),
      };

      const response = await fetch(
        "/https://grocerygo-ecom.onrender.com/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Order failed");
      }

      await fetch(
        "https://grocerygo-ecom.onrender.com/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderData.orderId,
            amount: totalAmount,
            paymentMethod,
            status: "Success",
          }),
        },
      );

      alert("Payment successful! Order confirmed 🎉");

      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-container">

        <h1>OTP Verification</h1>

        <p>
          Enter the 6 digit OTP sent for your payment.
        </p>

        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value.replace(/\D/g, "")
            )
          }
          placeholder="Enter OTP"
        />

        <button onClick={verifyOtp}>
          Verify & Confirm Payment
        </button>

        {/* Demo purpose */}
        <p className="demo-otp">
          Demo OTP: {generatedOtp}
        </p>

      </div>
    </div>
  );
}

export default Otp;