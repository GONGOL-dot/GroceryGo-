import React, { useEffect, useRef, useState } from "react";
import "./VoiceAssistant.css";

const API_URL = "https://grocerygo-ecom.onrender.com/";

const VoiceAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [reply, setReply] = useState(
    "Hello! I am your GroceryGo assistant. How can I help you?"
  );
  const [listening, setListening] = useState(false);
  const [products, setProducts] = useState([]);

  const recognitionRef = useRef(null);

  // ==============================
  // GET PRODUCTS
  // ==============================

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Products error:", error);
      });
  }, []);

  // ==============================
  // VOICE REPLY
  // ==============================

  const speak = (text, language = "en-IN") => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = language;
    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    if (language === "te-IN") {
      const teluguVoice = voices.find((voice) =>
        voice.lang?.toLowerCase().startsWith("te")
      );

      if (teluguVoice) {
        speech.voice = teluguVoice;
      }
    }

    window.speechSynthesis.speak(speech);
  };

  // ==============================
  // FIND PRODUCTS
  // ==============================

  const findProducts = (text) => {
    const value = String(text).toLowerCase().trim();

    if (!value) return [];

    return products.filter((product) => {
      const name = String(product.name || "").toLowerCase();

      const cleanName = name.replace(/^fresh\s+/i, "");

      const singularName =
        cleanName.endsWith("s") && !cleanName.endsWith("ss")
          ? cleanName.slice(0, -1)
          : cleanName;

      return (
        value.includes(name) ||
        value.includes(cleanName) ||
        value.includes(singularName)
      );
    });
  };

  // ==============================
  // ADD TO CART
  // ==============================

  const addProductToCart = async (product) => {
    try {
      const response = await fetch(`${API_URL}/cart`);
      const cart = await response.json();

      const existing = cart.find(
        (item) =>
          String(item.productId || item.id) === String(product.id)
      );

      if (existing) {
        await fetch(`${API_URL}/cart/${existing.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: (existing.quantity || 1) + 1,
          }),
        });
      } else {
        await fetch(`${API_URL}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...product,
            productId: product.id,
            quantity: 1,
          }),
        });
      }

      window.dispatchEvent(new Event("cartUpdated"));

      return true;
    } catch (error) {
      console.error("Cart error:", error);
      return false;
    }
  };

  // ==============================
  // PROCESS COMMAND
  // ==============================

  const processCommand = async (command, fromVoice = false) => {
    const text = String(command || "").trim();

    if (!text) return;

    const lower = text.toLowerCase();

    // Telugu detection
    const isTelugu =
      /[\u0C00-\u0C7F]/.test(text) ||
      lower.includes("undha") ||
      lower.includes("undi") ||
      lower.includes("unnaya") ||
      lower.includes("entha") ||
      lower.includes("kavali") ||
      lower.includes("ivvu") ||
      lower.includes("cheppu") ||
      lower.includes("ledu") ||
      lower.includes("levu");

    const language = isTelugu ? "te-IN" : "en-IN";

    // ==============================
    // GREETING
    // ==============================

    const greetings = [
      "hello",
      "hi",
      "hey",
      "crazy",
      "hey siri",
    ];

    const isGreeting = greetings.some((word) => {
      return (
        lower === word ||
        lower.startsWith(word + " ") ||
        lower.endsWith(" " + word)
      );
    });

    if (isGreeting) {
      const response = isTelugu
        ? "Hello! Nenu GroceryGo assistant ni. Meeku em kavali?"
        : "Hello! I am your GroceryGo assistant. How can I help you?";

      setReply(response);

      if (fromVoice) {
        speak(response, language);
      }

      return;
    }

    // ==============================
    // CURRENT COMMAND PRODUCTS
    // ==============================

    const matchedProducts = findProducts(text);

    // ==============================
    // ADD TO CART
    // ==============================

    if (
      lower.includes("add") &&
      (lower.includes("cart") ||
        lower.includes("basket") ||
        lower.includes("lo add") ||
        lower.includes("ki add"))
    ) {
      if (matchedProducts.length === 0) {
        const response = isTelugu
          ? "Sorry, aa item mana GroceryGo store lo available ga ledu."
          : "Sorry, that item is not available in our GroceryGo store.";

        setReply(response);

        if (fromVoice) {
          speak(response, language);
        }

        return;
      }

      const added = [];

      for (const product of matchedProducts) {
        const success = await addProductToCart(product);

        if (success) {
          added.push(product);
        }
      }

      let response = "";

      if (added.length === 1) {
        response = isTelugu
          ? `${added[0].name} cart lo add chesanu.`
          : `${added[0].name} has been added to your cart.`;
      } else if (added.length > 1) {
        const names = added
          .map((product) => product.name)
          .join(", ");

        response = isTelugu
          ? `${names} cart lo add chesanu.`
          : `${names} have been added to your cart.`;
      } else {
        response = isTelugu
          ? "Sorry, cart lo add cheyalekapoyanu."
          : "Sorry, I could not add the item to your cart.";
      }

      setReply(response);

      if (fromVoice) {
        speak(response, language);
      }

      return;
    }

    // ==============================
    // PRICE
    // ==============================

    if (
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("rate") ||
      lower.includes("entha")
    ) {
      if (matchedProducts.length === 0) {
        const response = isTelugu
          ? "Sorry, aa product mana GroceryGo store lo available ga ledu."
          : "Sorry, that product is not available in our GroceryGo store.";

        setReply(response);

        if (fromVoice) {
          speak(response, language);
        }

        return;
      }

      const response = matchedProducts
        .map((product) =>
          isTelugu
            ? `${product.name} price ₹${product.price}.`
            : `${product.name} costs ₹${product.price}.`
        )
        .join(" ");

      setReply(response);

      if (fromVoice) {
        speak(response, language);
      }

      return;
    }

    // ==============================
    // PRODUCT AVAILABLE
    // ==============================

    if (matchedProducts.length > 0) {
      let response = "";

      if (matchedProducts.length === 1) {
        const product = matchedProducts[0];

        response = isTelugu
          ? `Avunu, ${product.name} available ga undi. Price ₹${product.price}.`
          : `Yes, ${product.name} is available. The price is ₹${product.price}.`;
      } else {
        const names = matchedProducts
          .map(
            (product) =>
              `${product.name} ₹${product.price}`
          )
          .join(", ");

        response = isTelugu
          ? `Avunu, ee products available ga unnayi: ${names}.`
          : `Yes, these products are available: ${names}.`;
      }

      setReply(response);

      if (fromVoice) {
        speak(response, language);
      }

      return;
    }

    // ==============================
    // NOT AVAILABLE
    // ==============================

    const response = isTelugu
      ? "Sorry, aa item mana GroceryGo store lo available ga ledu."
      : "Sorry, that item is not available in our GroceryGo store.";

    setReply(response);

    if (fromVoice) {
      speak(response, language);
    }
  };

  // ==============================
  // TEXT SEND
  // ==============================

  const sendMessage = () => {
    const currentText = input.trim();

    if (!currentText) return;

    // IMPORTANT: clear old text
    setInput("");

    // Process only current command
    processCommand(currentText, false);
  };

  // ==============================
  // VOICE
  // ==============================

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const response =
        "Sorry, voice recognition is not supported in this browser.";

      setReply(response);
      speak(response);

      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    // Clear previous transcript
    setInput("");

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    // ==============================
    // START
    // ==============================

    recognition.onstart = () => {
      setListening(true);

      // VERY IMPORTANT
      setInput("");
    };

    // ==============================
    // NEW VOICE RESULT
    // ==============================

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript.trim();

      console.log("New command:", transcript);

      // Never append previous command
      setInput("");

      // Process ONLY this command
      processCommand(transcript, true);
    };

    // ==============================
    // ERROR
    // ==============================

    recognition.onerror = (event) => {
      console.log("Voice error:", event.error);

      setListening(false);

      if (event.error === "no-speech") {
        const response =
          "Sorry, I could not hear you. Please try again.";

        setReply(response);
        speak(response);

        return;
      }

      if (event.error === "not-allowed") {
        const response =
          "Please allow microphone permission to use voice assistant.";

        setReply(response);
        speak(response);

        return;
      }

      const response =
        "Sorry, I could not hear you clearly. Please try again.";

      setReply(response);
      speak(response);
    };

    // ==============================
    // END
    // ==============================

    recognition.onend = () => {
      setListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.log("Recognition start error:", error);
      setListening(false);
    }
  };

  // ==============================
  // CLEANUP
  // ==============================

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ==============================
  // UI
  // ==============================

  return (
    <div className="voice-assistant">

      {!open && (
        <button
          className="assistant-floating-button"
          onClick={() => setOpen(true)}
          title="GroceryGo Assistant"
        >
          🎤
        </button>
      )}

      {open && (
        <div className="assistant-box">

          {/* HEADER */}

          <div className="assistant-top">
            <div>
              <h3>🛒 GroceryGo</h3>
              <span>Assistant</span>
            </div>

            <button
              className="close-assistant"
              onClick={() => {
                setOpen(false);

                recognitionRef.current?.stop();

                if (window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }

                setListening(false);
                setInput("");
              }}
            >
              ×
            </button>
          </div>

          {/* REPLY */}

          <div className="assistant-reply">
            🤖 {reply}
          </div>

          {/* INPUT */}

          <div className="assistant-input">

            <input
              type="text"
              placeholder="Ask about a product..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              className={`assistant-mic ${
                listening ? "active" : ""
              }`}
              onClick={startListening}
            >
              {listening ? "⏹️" : "🎤"}
            </button>

            <button
              className="assistant-send"
              onClick={sendMessage}
            >
              ➤
            </button>

          </div>

          {listening && (
            <div className="listening-text">
              🎙️ Listening...
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;