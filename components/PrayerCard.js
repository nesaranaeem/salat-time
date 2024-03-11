// components/PrayerCard.js
import React from "react";
import { useTranslation } from "react-i18next";
import translateNumberToBengali from "../utils/translateNumberToBengali"; // Adjust the path as needed

const PrayerCard = ({ prayerName, time }) => {
  const { t, i18n } = useTranslation();

  // Check if the current language is Bengali and translate the numbers accordingly
  const displayTime =
    i18n.language === "bn" ? translateNumberToBengali(time) : time;

  return (
    <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow p-4 mb-2">
      <h2 className="text-lg font-semibold">{t(prayerName)}</h2>
      <p className="text-md">{displayTime}</p>
    </div>
  );
};

export default PrayerCard;
