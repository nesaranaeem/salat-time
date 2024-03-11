import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  differenceInSeconds,
  parseISO,
  format as formatDateFns,
} from "date-fns";
import translateNumberToBengali from "../utils/translateNumberToBengali";

const RamadanCard = ({ sehriIftarTimes, isTwelveHourFormat }) => {
  const { t, i18n } = useTranslation();
  const [timeLeft, setTimeLeft] = useState("");
  const [currentPeriod, setCurrentPeriod] = useState("");

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const today = formatDateFns(now, "yyyy-MM-dd");
      const tomorrow = formatDateFns(
        new Date(now.setDate(now.getDate() + 1)),
        "yyyy-MM-dd"
      );
      const sehriToday = parseISO(`${today}T${sehriIftarTimes.Sehri}`);
      const iftarToday = parseISO(`${today}T${sehriIftarTimes.Iftar}`);
      const sehriTomorrow = parseISO(`${tomorrow}T${sehriIftarTimes.Sehri}`);

      let targetTime, period;
      if (now < sehriToday) {
        targetTime = sehriToday;
        period = t("sehri");
      } else if (now >= sehriToday && now < iftarToday) {
        targetTime = iftarToday;
        period = t("iftar");
      } else {
        targetTime = sehriTomorrow; // Next day's Sehri after Iftar
        period = t("sehri");
      }

      const secondsDiff = differenceInSeconds(targetTime, now);
      if (secondsDiff >= 0) {
        const hours = Math.floor(secondsDiff / 3600);
        const minutes = Math.floor((secondsDiff % 3600) / 60);
        const seconds = secondsDiff % 60;
        let timeString = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        if (i18n.language === "bn") {
          timeString = translateNumberToBengali(timeString);
        }

        setTimeLeft(timeString);
        setCurrentPeriod(period);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [sehriIftarTimes, i18n.language]);

  const calculateRamadanDay = () => {
    const startOfRamadan = parseISO("2024-03-12");
    const currentDateTime = new Date();
    const dayDifference =
      Math.floor((currentDateTime - startOfRamadan) / (1000 * 60 * 60 * 24)) +
      1;
    return dayDifference >= 1 && dayDifference <= 30 ? dayDifference : null;
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":").map(Number);
    const period = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 || 12;
    let formattedTime = `${formattedHour}:${minute
      .toString()
      .padStart(2, "0")}`;

    if (!isTwelveHourFormat) {
      formattedTime = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
    } else {
      formattedTime += ` ${period}`;
    }

    if (i18n.language === "bn") {
      formattedTime = translateNumberToBengali(formattedTime);
    }
    return formattedTime;
  };

  const ramadanDay = calculateRamadanDay();

  return (
    <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow text-center py-4 my-8">
      <h3 className="text-2xl font-bold mb-4">{t("ramadanTimes")}</h3>
      {ramadanDay && (
        <div className="mb-4">
          <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
            {t("ramadanDay", {
              day:
                i18n.language === "bn"
                  ? translateNumberToBengali(ramadanDay.toString())
                  : ramadanDay,
            })}
          </span>
        </div>
      )}
      <p className="text-lg">
        {t("sehriLastTime")}: {formatTime(sehriIftarTimes?.Sehri)}
      </p>
      <p className="text-lg">
        {t("iftar")}: {formatTime(sehriIftarTimes?.Iftar)}
      </p>
      <p className="text-lg mt-4">
        {currentPeriod} {t("timeLeft")}: {timeLeft}
      </p>
      <p className="text-sm font-bold my-2">{t("sehriIftarNotice")}</p>
    </div>
  );
};

export default RamadanCard;
