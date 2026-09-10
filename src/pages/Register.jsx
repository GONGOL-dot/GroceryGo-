import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
    password: "",
    country: "India",
  });

  const [loading, setLoading] = useState(false);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.gender ||
      !formData.address ||
      !formData.phone ||
      !formData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // CHECK EMAIL ALREADY EXISTS
      const checkUser = await fetch(
        `https://grocerygo-ecom-eb51.onrender.com/users?email=${formData.email}`
      );

      const existingUsers = await checkUser.json();

      if (existingUsers.length > 0) {
        alert("Email already registered. Please login.");
        setLoading(false);
        return;
      }

      // REGISTER NEW USER
      const response = await fetch(
        "https://grocerygo-ecom-eb51.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Registration Successful!");

        setFormData({
          name: "",
          email: "",
          gender: "",
          address: "",
          phone: "",
          password: "",
          country: "India",
        });

        navigate("/login");
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      console.error("Register Error:", error);
      alert("Cannot connect to server. Please start json-server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay">

        <div className="register-box">

          {/* BACK BUTTON */}
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            type="button"
          >
            ←
          </button>

          <h1>Create Account</h1>

          <p className="register-subtitle">
            Join GroceryGo and start shopping
          </p>

          <form onSubmit={handleRegister}>

            {/* NAME */}
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* GENDER */}
            <div className="form-group gender-group">

              <label>Gender</label>

              <div className="gender-options">

                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  <span>Male</span>
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  <span>Female</span>
                </label>

              </div>

            </div>

            {/* ADDRESS */}
            <div className="form-group">
              <label>Address</label>

              <input
                type="text"
                name="address"
                placeholder="Enter your current address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* COUNTRY */}
            <div className="form-group">
              <label>Country</label>

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          {/* LOGIN */}
          <p className="login-link">
            Already have an account?

            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;