import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      category: "Category",
      orders: "Orders",
      profile: "Profile",
      login: "Login",
      wishlist: "Wishlist",
      cart: "Cart",
      search: "Search groceries...",
      language: "Language",
      quickMenu: "Quick Menu",
      screenMode: "Screen Mode",
      myAddress: "My Address",
      needHelp: "Need Help?",
      gstDetails: "GST Details",
      payments: "Payments",
      coupons: "Coupons",
      videoCallShopping: "Video Call Shopping",
    },
  },

  te: {
    translation: {
      home: "హోమ్",
      category: "వర్గాలు",
      orders: "ఆర్డర్లు",
      profile: "ప్రొఫైల్",
      login: "లాగిన్",
      wishlist: "విష్‌లిస్ట్",
      cart: "కార్ట్",
      search: "కిరాణా వస్తువులను వెతకండి...",
      language: "భాష",
      quickMenu: "త్వరిత మెనూ",
      screenMode: "స్క్రీన్ మోడ్",
      myAddress: "నా చిరునామా",
      needHelp: "సహాయం కావాలా?",
      gstDetails: "జీఎస్టీ వివరాలు",
      payments: "చెల్లింపులు",
      coupons: "కూపన్లు",
      videoCallShopping: "వీడియో కాల్ షాపింగ్",
    },
  },

  hi: {
    translation: {
      home: "होम",
      category: "श्रेणी",
      orders: "ऑर्डर",
      profile: "प्रोफ़ाइल",
      login: "लॉगिन",
      wishlist: "विशलिस्ट",
      cart: "कार्ट",
      search: "किराने का सामान खोजें...",
      language: "भाषा",
      quickMenu: "क्विक मेनू",
      screenMode: "स्क्रीन मोड",
      myAddress: "मेरा पता",
      needHelp: "मदद चाहिए?",
      gstDetails: "जीएसटी विवरण",
      payments: "भुगतान",
      coupons: "कूपन",
      videoCallShopping: "वीडियो कॉल शॉपिंग",
    },
  },

  ta: {
    translation: {
      home: "முகப்பு",
      category: "வகைகள்",
      orders: "ஆர்டர்கள்",
      profile: "சுயவிவரம்",
      login: "உள்நுழைய",
      wishlist: "விருப்பப்பட்டியல்",
      cart: "கூடை",
      search: "மளிகைப் பொருட்களை தேடுங்கள்...",
      language: "மொழி",
      quickMenu: "விரைவு மெனு",
      screenMode: "திரை முறை",
      myAddress: "என் முகவரி",
      needHelp: "உதவி வேண்டுமா?",
      gstDetails: "ஜிஎஸ்டி விவரங்கள்",
      payments: "பணம் செலுத்துதல்",
      coupons: "கூப்பன்கள்",
      videoCallShopping: "வீடியோ கால் ஷாப்பிங்",
    },
  },

  kn: {
    translation: {
      home: "ಮುಖಪುಟ",
      category: "ವರ್ಗಗಳು",
      orders: "ಆರ್ಡರ್‌ಗಳು",
      profile: "ಪ್ರೊಫೈಲ್",
      login: "ಲಾಗಿನ್",
      wishlist: "ವಿಶ್‌ಲಿಸ್ಟ್",
      cart: "ಕಾರ್ಟ್",
      search: "ದಿನಸಿ ವಸ್ತುಗಳನ್ನು ಹುಡುಕಿ...",
      language: "ಭಾಷೆ",
      quickMenu: "ತ್ವರಿತ ಮೆನು",
      screenMode: "ಸ್ಕ್ರೀನ್ ಮೋಡ್",
      myAddress: "ನನ್ನ ವಿಳಾಸ",
      needHelp: "ಸಹಾಯ ಬೇಕೇ?",
      gstDetails: "ಜಿಎಸ್ಟಿ ವಿವರಗಳು",
      payments: "ಪಾವತಿಗಳು",
      coupons: "ಕೂಪನ್‌ಗಳು",
      videoCallShopping: "ವೀಡಿಯೊ ಕಾಲ್ ಶಾಪಿಂಗ್",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;