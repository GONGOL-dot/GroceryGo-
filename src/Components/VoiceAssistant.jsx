import React, { useEffect, useRef, useState } from "react";
import "./VoiceAssistant.css";

const VoiceAssistant = () => {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const [reply, setReply] = useState(
    "Hey Crazy! Ask me about any product."
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);

  // ==============================
  // GET PRODUCTS FROM DB.JSON
  // ==============================
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Products not loaded");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        console.log("Products loaded:", data);
      })
      .catch((error) => {
        console.error(error);

        setReply(
          "Hey Crazy! I could not load the products. Please check the backend."
        );
      });
  }, []);

  // ==============================
  // VOICE SPEAK FUNCTION
  // ==============================
  const speak = (text, language = "en-IN") => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    // Stop previous voice
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    // Telugu voice
    if (language === "te-IN") {
      const teluguVoice = voices.find(
        (voice) =>
          voice.lang === "te-IN" ||
          voice.lang.toLowerCase().startsWith("te")
      );

      if (teluguVoice) {
        utterance.voice = teluguVoice;
      }
    }

    // English voice
    if (language === "en-IN") {
      const englishVoice = voices.find(
        (voice) =>
          voice.lang === "en-IN" ||
          voice.lang.toLowerCase().startsWith("en")
      );

      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  };

  // ==============================
  // PRODUCT ALIASES
  // ==============================
  const productAliases = {
    apple: ["apple", "apples", "యాపిల్", "యాపిల్స్"],
    banana: ["banana", "bananas", "అరటి", "అరటిపండు", "అరటిపండ్లు"],
    tomato: ["tomato", "tomatoes", "టమాటో", "టమాటోలు"],
    potato: ["potato", "potatoes", "బంగాళదుంప", "బంగాళదుంపలు"],
    onion: ["onion", "onions", "ఉల్లిపాయ", "ఉల్లిపాయలు"],
    carrot: ["carrot", "carrots", "క్యారెట్", "క్యారెట్లు"],
    milk: ["milk", "పాలు"],
    cheese: ["cheese", "చీజ్"],
    butter: ["butter", "బటర్", "వెన్న"],
    bread: ["bread", "బ్రెడ్"],
    cake: ["cake", "కేక్"],
    cookies: ["cookie", "cookies", "కుకీ", "కుకీస్"],
    rice: ["rice", "బియ్యం"],
    wheat: ["wheat", "గోధుమ", "గోధుమలు"],
    dal: ["dal", "toor dal", "పప్పు", "తూర్ దాల్"]
  };

  // ==============================
  // FIND PRODUCT
  // ==============================
  const findProduct = (question) => {
    const text = question.toLowerCase().trim();

    // Direct exact product matching
    const directProduct = products.find((product) => {
      const name = product.name.toLowerCase();

      return text.includes(name);
    });

    if (directProduct) {
      return directProduct;
    }

    // Match aliases
    for (const [key, aliases] of Object.entries(productAliases)) {
      const foundAlias = aliases.some((alias) =>
        text.includes(alias.toLowerCase())
      );

      if (foundAlias) {
        const matchedProduct = products.find((product) =>
          product.name.toLowerCase().includes(key)
        );

        if (matchedProduct) {
          return matchedProduct;
        }
      }
    }

    // Match words
    const words = text.split(/\s+/);

    const matchedProduct = products.find((product) => {
      const productWords = product.name
        .toLowerCase()
        .replace("fresh", "")
        .trim()
        .split(/\s+/);

      return productWords.some(
        (word) =>
          word.length > 2 &&
          words.some((questionWord) =>
            questionWord.includes(word)
          )
      );
    });

    return matchedProduct || null;
  };

  // ==============================
  // DETECT TELUGU
  // ==============================
  const isTeluguText = (text) => {
    return /[\u0C00-\u0C7F]/.test(text);
  };

  // ==============================
  // HANDLE QUESTION
  // ==============================
  const handleQuestion = (
    question,
    shouldSpeak = false,
    selectedLanguage = "en-IN"
  ) => {
    if (!question || !question.trim()) {
      return;
    }

    console.log("Question:", question);
    console.log("Products:", products);

    const product = findProduct(question);

    const isTelugu =
      selectedLanguage === "te-IN" ||
      isTeluguText(question);

    let answer = "";

    // ==========================
    // PRODUCT EXISTS
    // ==========================
    if (product) {
      if (isTelugu) {
        answer =
          `హే క్రేజీ! అవును, ${product.name} మన Grocery Go లో ఉంది. ` +
          `దీని ధర ${product.price} రూపాయలు.`;
      } else {
        answer =
          `Hey Crazy! Yes, ${product.name} is available in our Grocery Go store. ` +
          `The price is ${product.price} rupees.`;
      }
    }

    // ==========================
    // PRODUCT DOES NOT EXIST
    // ==========================
    else {
      if (isTelugu) {
        answer =
          "హే క్రేజీ! సారీ, మీరు అడిగిన ఐటమ్ మన Grocery Go స్టోర్‌లో లేదు.";
      } else {
        answer =
          "Hey Crazy! Sorry, that item is not available in our Grocery Go store.";
      }
    }

    // Show text reply
    setReply(answer);

    // Speak only for voice question
    if (shouldSpeak) {
      speak(answer, isTelugu ? "te-IN" : "en-IN");
    }

    setInput("");
  };

  // ==============================
  // TEXT SEND
  // ==============================
  const handleSend = (event) => {
    event.preventDefault();

    // Text = only text reply
    handleQuestion(input, false);
  };

  // ==============================
  // START VOICE RECOGNITION
  // ==============================
  const startListening = (language) => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const answer =
        language === "te-IN"
          ? "హే క్రేజీ! మీ బ్రౌజర్‌లో voice recognition support లేదు."
          : "Hey Crazy! Voice recognition is not supported in your browser.";

      setReply(answer);

      speak(answer, language);

      return;
    }

    // Stop old recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (error) {}
    }

    // Stop old voice
    window.speechSynthesis.cancel();

    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);

      if (language === "te-IN") {
        setReply("🎤 హే క్రేజీ! నేను వింటున్నాను...");
      } else {
        setReply("🎤 Hey Crazy! I am listening...");
      }
    };

    recognition.onresult = (event) => {
      const spokenText =
        event.results[0][0].transcript.trim();

      console.log("Voice heard:", spokenText);

      // Show what user spoke
      setInput(spokenText);

      // Answer + voice reply
      handleQuestion(
        spokenText,
        true,
        language
      );
    };

    recognition.onerror = (event) => {
      console.log("Voice Error:", event.error);

      setIsListening(false);

      let answer = "";

      if (event.error === "not-allowed") {
        answer =
          language === "te-IN"
            ? "హే క్రేజీ! Microphone permission allow చేయండి."
            : "Hey Crazy! Please allow microphone permission.";
      } else {
        answer =
          language === "te-IN"
            ? "హే క్రేజీ! నేను సరిగ్గా వినలేకపోయాను. మళ్ళీ చెప్పండి."
            : "Hey Crazy! I could not hear you clearly. Please try again.";
      }

      setReply(answer);
      speak(answer, language);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.log(error);
      setIsListening(false);
    }
  };

  return (
    <>
      {/* FLOATING CORNER BUTTON */}

      {!isOpen && (
        <button
          className="voice-floating-button"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          🤖
        </button>
      )}

      {/* ASSISTANT POPUP */}

      {isOpen && (
        <div className="voice-assistant">
          <button
            className="close-button"
            type="button"
            onClick={() => {
              setIsOpen(false);
              window.speechSynthesis.cancel();
            }}
          >
            ×
          </button>

          <div className="assistant-header">
            <h2>🤖 Grocery Go Assistant</h2>

            <p>
              Ask in English or Telugu
            </p>
          </div>

          {/* AI REPLY */}

          <div className="assistant-reply">
            {reply}
          </div>

          {/* INPUT */}

          <form
            className="assistant-input-area"
            onSubmit={handleSend}
          >
            <input
              type="text"
              value={input}
              placeholder="Ask about products..."
              onChange={(event) =>
                setInput(event.target.value)
              }
            />

            {/* ENGLISH VOICE */}

            <button
              type="button"
              className={
                isListening
                  ? "mic-button listening"
                  : "mic-button"
              }
              onClick={() =>
                startListening("en-IN")
              }
            >
              🎤 EN
            </button>

            {/* TELUGU VOICE */}

            <button
              type="button"
              className={
                isListening
                  ? "mic-button listening"
                  : "mic-button"
              }
              onClick={() =>
                startListening("te-IN")
              }
            >
              🎤 తెలుగు
            </button>

            <button
              type="submit"
              className="send-button"
            >
              Send
            </button>
          </form>

          <div className="examples">
            <p>
              🎤 EN: Do you have milk?
            </p>

            <p>
              🎤 తెలుగు: పాలు ఉందా?
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;