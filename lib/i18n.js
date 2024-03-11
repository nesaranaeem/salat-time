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
      calculationMethod: "Salat Time Calculation Method",
      switchTo24HourFormat: "Switch to 24-Hour Format",
      switchTo12HourFormat: "Switch to 12-Hour Format",
      switchLanguage: "English/বাংলা",
      salatTime: "Salat Time",
      Fajr: "Fajr",
      Sunrise: "Sunrise",
      Dhuhr: "Dhuhr",
      Asr: "Asr",
      Maghrib: "Maghrib",
      Isha: "Isha",
      ramadanTimes: "Ramadan Mubarak",
      sehri: "Sehri",
      sehriLastTime: "Sehri Last Time",
      iftar: "Iftar",
      ramadanDay: "Today Is {{day}} Ramadan",
      sehriIftarNotice:
        "Note: The last time of Sahri is cautiously taken 3 minutes before Subhi Sadiq. Iftar timing is cautiously extended by 3 minutes after sunset. - Islamic Foundation Bangladesh",
      countdown: "Countdown",
      disclaimer:
        "This is a beta version. This application was developed within a few hours. The calculation of prayer times is from a third-party API, and the calculation of Sehri and Iftar times is adjusted with the third-party API. Currently, Sehri and Iftar time calculation is available for Bangladesh only, following the method guided by the Islamic Foundation Bangladesh. The developer is not responsible for any errors. Always follow an authenticated calendar for Sehri and Iftar.",
      developedBy: "Developed by",
    },
  },
  bn: {
    translation: {
      currentTime: "বর্তমান সময়",
      prayerTimesFor: "নামাজের সময়সূচি",
      nextPrayer: "পরবর্তী নামাজ",
      timeLeft: "বাকি সময়",
      calculationMethod: "নামাজের সময় গণনা পদ্ধতি",
      switchTo24HourFormat: "২৪ ঘন্টা ফরম্যাটে পরিবর্তন করুন",
      switchTo12HourFormat: "১২ ঘন্টা ফরম্যাটে পরিবর্তন করুন",
      switchLanguage: "English/বাংলা",
      salatTime: "নামাজের সময়সূচী",
      Fajr: "ফজর",
      Sunrise: "সূর্যোদয়",
      Dhuhr: "যোহর",
      Asr: "আসর",
      Maghrib: "মাগরিব",
      Isha: "এশা",
      ramadanTimes: "রমজান মোবারক",
      sehri: "সাহরী",
      sehriLastTime: "সাহরীর শেষ সময়",
      iftar: "ইফতার",
      ramadanDay: "আজ {{day}} রমজান",
      sehriIftarNotice:
        "বি.দ্র.: সাহরীর শেষ সময় সতর্কতামূলকভাবে সুব্হি সাদিকের ৩ মিনিট পূর্বে ধরা হয়েছে । সূর্যাস্তের পর সতর্কতামূলকভাবে ৩ মিনিট বাড়িয়ে ইফতারের সময় নির্ধারণ করা হয়েছে। - ইসলামিক ফাউন্ডেশন বাংলাদেশ",
      countdown: "বাকি সময়",
      disclaimer:
        "এটি একটি বিটা সংস্করণ। এই অ্যাপ্লিকেশনটি কয়েক ঘণ্টার মধ্যে তৈরি করা হয়েছে। নামাজের সময় গণনা তৃতীয় পক্ষের এপিআই থেকে প্রাপ্ত, এবং সেহরি ও ইফতারের সময় গণনা তৃতীয় পক্ষের এপিআই দ্বারা সামঞ্জস্য করা হয়েছে। বর্তমানে, সেহরি ও ইফতারের সময় গণনা কেবলমাত্র বাংলাদেশের জন্য উপলব্ধ, ইসলামিক ফাউন্ডেশন বাংলাদেশ দ্বারা নির্দেশিত পদ্ধতি অনুসরণ করে। ডেভেলপার কোনো ত্রুটির জন্য দায়ী নয়। সেহরি ও ইফতারের জন্য সবসময় একটি প্রামাণিত ক্যালেন্ডার অনুসরণ করুন।",
      developedBy: "ডেভেলপ করেছেন",
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: "bn", // Explicitly set Bengali as the default language
    fallbackLng: "bn",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      // Check if the localStorage or navigator language is explicitly set to English,
      // otherwise fallback to Bengali.
      checkWhitelist: true, // Ensure checking within the whitelist
    },
    whitelist: ["en", "bn"], // Define allowed languages
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },
  });

export default i18n;
