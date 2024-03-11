// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      currentTime: "Current Time",
      prayerTimesFor: "Prayer Times for",
      nextPrayer: "Next Prayer",
      timeLeft: "Time Left",
      calculationMethod: "Calculation Method",
      switchTo24HourFormat: "Switch to 24-Hour Format",
      switchLanguage: "English/বাংলা",
      salatTime: "Salat Time",
      Fajr: "Fajr",
      Sunrise: "Sunrise",
      Dhuhr: "Dhuhr",
      Asr: "Asr",
      Maghrib: "Maghrib",
      Isha: "Isha",
    },
  },
  bn: {
    translation: {
      currentTime: "বর্তমান সময়",
      prayerTimesFor: "নামাজের সময়সূচি",
      nextPrayer: "পরবর্তী নামাজ",
      timeLeft: "বাকি সময়",
      calculationMethod: "গণনা পদ্ধতি",
      switchTo24HourFormat: "২৪ ঘন্টা ফরম্যাটে পরিবর্তন করুন",
      switchLanguage: "English/বাংলা",
      salatTime: "নামাজের সময়সূচী",
      Fajr: "ফজর",
      Sunrise: "সূর্যোদয়",
      Dhuhr: "যোহর",
      Asr: "আসর",
      Maghrib: "মাগরিব",
      Isha: "এশা",
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // Passes i18next use LanguageDetector
  .init({
    resources,
    fallbackLng: "bn",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
