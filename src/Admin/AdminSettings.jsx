import React, { useState } from "react";
import "./AdminSettings.css";

const AdminSettings = () => {
  const [storeName, setStoreName] =
    useState("GroceryGo");

  const [email, setEmail] =
    useState("admin@grocerygo.com");

  const [phone, setPhone] =
    useState("");

  const saveSettings = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="admin-settings">

      <h1>Admin Settings</h1>
      <p>Manage your store settings.</p>

      <div className="settings-form">

        <label>Store Name</label>

        <input
          value={storeName}
          onChange={(e) =>
            setStoreName(e.target.value)
          }
        />

        <label>Admin Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <label>Phone Number</label>

        <input
          type="text"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <button onClick={saveSettings}>
          Save Settings
        </button>

      </div>

    </div>
  );
};

export default AdminSettings;