import React, { useEffect, useRef, useState } from "react";
import "./SplashScreen.css";

function SplashScreen({ onFinish }) {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  const startSplash = async () => {
    if (started) return;

    try {
      // Song start
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1;

        await audioRef.current.play();
      }

      // Button/message disappear
      setStarted(true);

    } catch (error) {
      console.log("Song error:", error);

      // Error unna button disappear ayi website continue avvali
      setStarted(true);
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

    return () => clearTimeout(timer);
  }, [started, onFinish]);

  return (
    <div
      className="splash-screen"
      onClick={startSplash}
    >
      <audio
        ref={audioRef}
        src="/song.mp3"
        preload="auto"
      />

      {/* Click button only before song starts */}
      {!started && (
        <div className="sound-message">
          🔊 Click to Start GroceryGo
        </div>
      )}

      <div className="splash-title">
        <h1>GroceryGo</h1>
        <p>Fresh Vegetables at Your Doorstep</p>
      </div>

      <div className="speech-man">
        Kuragayalo... Kuragayalo... 🥬🥕
      </div>

      <div className="speech-woman">
        Kuragayalo... Kuragayalo... 🍅🥬
      </div>

      <div className="vendor-man">
        <img src="/men.png" alt="Vegetable Seller" />
      </div>

      <div className="vendor-woman">
        <img src="/women.png" alt="Vegetable Seller" />
      </div>

      <div className="village-ground"></div>
    </div>
  );
}

export default SplashScreen;