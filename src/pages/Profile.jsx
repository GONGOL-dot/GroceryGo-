import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaHeart,
  FaSignOutAlt,
  FaEdit,
  FaPhone,
  FaMapMarkerAlt,
  FaCamera,
} from "react-icons/fa";

import "../Styles/ProfilePage.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    setUser(parsedUser);
    setName(parsedUser.name || "");
    setPhone(parsedUser.phone || "");
    setAddress(parsedUser.address || "");
    setProfileImage(parsedUser.profileImage || "");
  }, [navigate]);

  // DP CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // SAVE PROFILE
  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      phone,
      address,
      profileImage,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    setIsEditing(false);

    alert("Profile Updated Successfully!");
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <h1>My Profile</h1>

        {/* PROFILE CARD */}
        <div className="profile-card">

          {/* PROFILE IMAGE */}
          <div className="profile-image-section">

            <div className="profile-avatar">

              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                />
              ) : (
                <FaUser />
              )}

            </div>

            {isEditing && (
              <label className="camera-btn">

                <FaCamera />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

              </label>
            )}

          </div>

          {/* NAME */}
          <div className="profile-info">

            {isEditing ? (
              <>
                <label>Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </>
            ) : (
              <h2>{name}</h2>
            )}

            {/* EMAIL */}
            <p className="profile-email">
              {user.email}
            </p>

          </div>

        </div>


        {/* PERSONAL DETAILS */}
        <div className="details-card">

          <h2>Personal Details</h2>

          {/* PHONE */}
          <div className="detail-row">

            <div className="detail-icon">
              <FaPhone />
            </div>

            <div className="detail-content">

              <span>Phone Number</span>

              {isEditing ? (
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />
              ) : (
                <p>
                  {phone || "Add your phone number"}
                </p>
              )}

            </div>

          </div>


          {/* ADDRESS */}
          <div className="detail-row">

            <div className="detail-icon">
              <FaMapMarkerAlt />
            </div>

            <div className="detail-content">

              <span>Address</span>

              {isEditing ? (
                <textarea
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                />
              ) : (
                <p>
                  {address || "Add your address"}
                </p>
              )}

            </div>

          </div>

        </div>


        {/* EDIT / SAVE BUTTON */}
        {isEditing ? (

          <button
            className="save-profile-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

        ) : (

          <button
            className="edit-profile-btn"
            onClick={() =>
              setIsEditing(true)
            }
          >
            <FaEdit />
            Edit Profile
          </button>

        )}


        {/* OPTIONS */}
        <div className="profile-options">

          {/* WISHLIST */}
          <div
            className="profile-option wishlist-option"
            onClick={() =>
              navigate("/wishlist")
            }
          >

            <div className="option-left">

              <FaHeart />

              <span>My Wishlist</span>

            </div>

            <span className="arrow">
              ›
            </span>

          </div>


          {/* LOGOUT */}
          <div
            className="profile-option logout-option"
            onClick={handleLogout}
          >

            <div className="option-left">

              <FaSignOutAlt />

              <span>Logout</span>

            </div>

            <span className="arrow">
              ›
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;