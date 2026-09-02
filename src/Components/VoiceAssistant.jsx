import React, { useState, useRef } from "react";
import "./VoiceAssistant.css";

const VoiceAssistant = ({ products = [] }) => {
  const [message, setMessage] = useState(
    "Hi! Ask me about any product available in our store."
  );

  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  // 🔊 Telugu + English Voice
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(text);

      // Telugu voice preference
      speech.lang = "te-IN";

      speech.rate = 0.9;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }
  };

  // 🎤 Start Voice Recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const userQuestion = event.results[0][0].transcript;

      console.log("User asked:", userQuestion);

      checkProduct(userQuestion);
    };

    recognition.onerror = () => {
      setListening(false);
      setMessage("Sorry, I could not understand your question.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  // 🛒 Check Product
  const checkProduct = (question) => {
    const lowerQuestion = question.toLowerCase();

    // Product name match
    const foundProduct = products.find((product) =>
      lowerQuestion.includes(product.name.toLowerCase())
    );

    if (foundProduct) {
      const englishText = `Yes! ${foundProduct.name} is available in our store.`;

      setMessage(englishText);

      // 🔊 Telugu + English voice
      speak(
        `Hi Crazy! Yes, ${foundProduct.name} undhi. Mana GroceryGo store lo available undhi.`
      );
    } else {
      const englishText =
        "Sorry! This product is currently not available in our store.";

      setMessage(englishText);

      // 🔊 Telugu + English voice
      speak(
        "Sorry Crazy! Ee item mana GroceryGo store lo currently available ledhu."
      );
    }
  };

  return (
    <div className="voice-assistant">
      <div className="voice-message">
        <p>{message}</p>
      </div>

      <button
        className={`voice-button ${listening ? "listening" : ""}`}
        onClick={startListening}
      >
        🎤 {listening ? "Listening..." : "Ask by Voice"}
      </button>
    </div>
  );
};

export default VoiceAssistant;