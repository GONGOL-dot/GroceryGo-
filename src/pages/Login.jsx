import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaArrowLeft,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

import "../Styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userId.trim() || !password.trim()) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      const response = await axios.get(
        "https://grocerygo-ecom.onrender.com/users"
      );

      const users = response.data;

      const user = users.find(
        (item) =>
          item.email?.trim().toLowerCase() ===
            userId.trim().toLowerCase() &&
          item.password === password.trim()
      );

      // USER FOUND
      if (user) {
        // Save logged in user
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(user)
        );

        // ADMIN LOGIN
        if (user.role === "admin") {
          alert(
            `Welcome Admin ${user.name}! Login Successful`
          );

          navigate("/admin");
        }

        // NORMAL USER LOGIN
        else {
          alert(
            `Welcome ${user.name}! Login Successful`
          );

          navigate("/home");
        }
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        "Cannot connect to server. Please check json-server!"
      );
    }
  };

  return (
    <div className="login-page">

      {/* BACK BUTTON */}
      <button
        type="button"
        className="back-btn"
        onClick={() => navigate("/home")}
      >
        <FaArrowLeft />
      </button>

      {/* LOGIN FORM */}
      <div className="login-container">

        <h1>Login</h1>

        <p className="login-subtitle">
          Welcome back! Login to continue shopping.
        </p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="input-group">

            <label>Email</label>

            <div className="input-box">

              <FaUser className="input-icon" />

              <input
                type="email"
                placeholder="Enter your Email"
                value={userId}
                onChange={(e) =>
                  setUserId(e.target.value)
                }
                required
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="input-group">

            <label>Password</label>

            <div className="input-box">

              <FaLock className="input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              {showPassword ? (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={() =>
                    setShowPassword(false)
                  }
                />
              ) : (
                <FaEye
                  className="eye-icon"
                  onClick={() =>
                    setShowPassword(true)
                  }
                />
              )}

            </div>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="login-btn"
          >
            LOGIN
          </button>

        </form>

        {/* REGISTER */}
        <p className="login-link">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

        {/* ADMIN DASHBOARD */}
        <div className="admin-login-section">

          <button
            type="button"
            className="admin-dashboard-btn"
            onClick={() => navigate("/admin")}
          >
            <FaUserShield />
            Admin Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;