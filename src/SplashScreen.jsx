import React, { useEffect, useRef, useState } from "react";
import "./SplashScreen.css";

function SplashScreen({ onFinish }) {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  const startSplash = async () => {
    if (started) return;

    // Images movement start
    setStarted(true);

    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1;
        await audioRef.current.play();
      }
    } catch (error) {
      console.log("Song Error:", error);
    }
  };

  useEffect(() => {
    if (!started) return;

    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      onFinish();
    }, 6000);

    return () => {
      clearTimeout(timer);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [started, onFinish]);

  return (
    <div className="splash-container">

      <audio
        ref={audioRef}
        src="/song.mp3"
        preload="auto"
      />

      {/* MAN - COMPLETE LEFT TO RIGHT */}
      <img
        src="/men.png"
        alt="Man"
        className={`moving-man ${started ? "move-man" : ""}`}
      />

      {/* WOMAN - COMPLETE RIGHT TO LEFT */}
      <img
        src="/women.png"
        alt="Woman"
        className={`moving-woman ${started ? "move-woman" : ""}`}
      />

      {/* CENTER CONTENT */}
      <div className="center-content">

        <h1>GroceryGo</h1>

        <p>Fresh Vegetables at Your Doorstep</p>

        {!started && (
          <button
            className="start-btn"
            onClick={startSplash}
          >
            🔊 Start GroceryGo
          </button>
        )}

      </div>

      <div className="bottom-green"></div>

    </div>
  );
}

export default SplashScreen;