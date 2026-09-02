import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../Styles/QuickPages.css";

const Language = () => {
  const { i18n } = useTranslation();

  const languageData = [
    {
      name: "English",
      code: "en",
    },
    {
      name: "Telugu",
      code: "te",
    },
    {
      name: "Hindi",
      code: "hi",
    },
    {
      name: "Tamil",
      code: "ta",
    },
    {
      name: "Kannada",
      code: "kn",
    },
    {
      name: "Malayalam",
      code: "ml",
    },
  ];

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const changeLanguage = (name, code) => {
    setLanguage(code);

    // Change complete website language
    i18n.changeLanguage(code);

    // Save selected language
    localStorage.setItem("language", code);
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

        <h1>Language</h1>
      </div>

      <div className="quick-card">
        <h2>Select Language</h2>

        <p>Choose your preferred application language.</p>

        <div className="quick-list">
          {languageData.map((item) => (
            <div
              key={item.code}
              className="quick-item"
              onClick={() =>
                changeLanguage(item.name, item.code)
              }
            >
              <span>{item.name}</span>

              <span>
                {language === item.code ? "✓" : ""}
              </span>
            </div>
          ))}
        </div>

        <p className="quick-success">
          Selected Language: {
            languageData.find(
              (item) => item.code === language
            )?.name
          }
        </p>
      </div>
    </div>
  );
};

export default Language;