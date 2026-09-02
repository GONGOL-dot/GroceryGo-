import React, { useEffect, useState } from "react";
import "../Styles/QuickPages.css";

const ScreenMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");

    document.body.classList.add(`${mode}-theme`);

    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <div className="quick-page">
      <div className="quick-header">
        <button
          className="quick-back"
          onClick={() => window.history.back()}
        >
          ←
        </button>

        <h1>Screen Mode</h1>
      </div>

      <div className="quick-card">
        <h2>Appearance</h2>

        <p>Choose how the website should look.</p>

        <div className="theme-options">

          <button
            className={`theme-option ${
              mode === "light" ? "active-theme" : ""
            }`}
            onClick={() => setMode("light")}
          >
            <span className="theme-icon">☀️</span>
            <span>Light Mode</span>
          </button>

          <button
            className={`theme-option ${
              mode === "dark" ? "active-theme" : ""
            }`}
            onClick={() => setMode("dark")}
          >
            <span className="theme-icon">🌙</span>
            <span>Dark Mode</span>
          </button>

        </div>

        <p className="quick-success">
          Selected Mode: {mode === "light" ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </p>
      </div>
    </div>
  );
};

export default ScreenMode;