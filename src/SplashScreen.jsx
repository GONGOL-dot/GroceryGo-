import React, { useEffect, useRef, useState } from "react";
import "./SplashScreen.css";

function SplashScreen({ onFinish }) {
  const audioRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleClick = () => {
    if (!musicStarted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setMusicStarted(true))
        .catch((error) => console.log("Audio error:", error));
    }
  };

  return (
    <div className="splash-screen" onClick={handleClick}>
      <audio ref={audioRef} loop>
        <source src="/song.mp3" type="audio/mpeg" />
      </audio>

      <div className="splash-title">
        <h1>GroceryGo</h1>
        <p>Fresh Vegetables at Your Doorstep</p>
      </div>

      <div className="splash-images">
        <img
          src="/men.png"
          alt="Grocery"
          className="moving-image image-left"
        />

        <img
          src="/women.png"
          alt="Grocery"
          className="moving-image image-right"
        />
      </div>

      <div className="splash-bottom">
        {musicStarted
          ? "Welcome to GroceryGo 🎵"
          : "Click anywhere to start 🎵"}
      </div>
    </div>
  );
}

export default SplashScreen;