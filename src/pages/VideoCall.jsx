import React, { useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import "../Styles/QuickPages.css";

const VideoCall = () => {
  const [started, setStarted] = useState(false);

  // Same room name = Customer and Assistant join same call
  const roomName = "GroceryShoppingHelpRoom2026";

  const startShopping = () => {
    setStarted(true);
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

        <h1>Video Call Shopping</h1>
      </div>

      {!started ? (
        <div className="quick-card">
          <h2>Shop with Video Assistance 📹</h2>

          <p>
            Connect with our shopping assistant and select your
            grocery items through a live video call.
          </p>

          <div className="video-preview">
            📹 Ready to Start Video Shopping
          </div>

          <div className="video-controls">
            <button
              className="quick-btn"
              onClick={startShopping}
            >
              Start Video Shopping
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "80vh",
            marginTop: "20px",
            borderRadius: "15px",
            overflow: "hidden",
          }}
        >
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={roomName}
            configOverwrite={{
              startWithAudioMuted: false,
              startWithVideoMuted: false,
            }}
            userInfo={{
              displayName: "Customer",
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = "100%";
              iframeRef.style.width = "100%";
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoCall;