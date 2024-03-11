import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { format } from "date-fns";
import getPrayerTimes from "../lib/fetchPrayerTimes";
import reverseGeocode from "../lib/reverseGeocode";
import toggleTimeFormat from "../lib/formatTime";
import { getNextPrayerTime } from "../lib/getNextPrayerTime";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import PrayerCard from "../components/PrayerCard";
import TimeFormatToggle from "../components/TimeFormatToggle";
import translateNumberToBengali from "../utils/translateNumberToBengali";
import Head from "next/head";

export default function Home() {
  const [times, setTimes] = useState({});
  const [locationName, setLocationName] = useState("Dhaka");
  const [method, setMethod] = useState(3);
  const [methods, setMethods] = useState([]);
  const [isTwelveHourFormat, setIsTwelveHourFormat] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [nextPrayerInfo, setNextPrayerInfo] = useState({
    nextPrayer: "",
    nextPrayerTime: "",
    countdown: "",
  });
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const response = await axios.get("https://api.aladhan.com/v1/methods");
        const filteredMethods = Object.values(response.data.data).filter(
          (m) => m.id !== 99
        );
        setMethods(filteredMethods);
      } catch (error) {
        console.error("Error fetching calculation methods:", error);
      }
    };

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(format(now, "hh:mm:ss a"));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    fetchMethods();
    setLoading(true); // Start loading

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const location = await reverseGeocode(latitude, longitude);
        if (location) {
          setLocationName(location);
        } else {
          setLocationName("Unknown Location");
          toast.error(
            "Could not fetch location name. Showing times for your coordinates."
          );
        }

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(
          currentDate.getMonth() + 1
        ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
        const prayerTimes = await getPrayerTimes(
          latitude,
          longitude,
          formattedDate,
          method
        );
        setTimes(prayerTimes);
        setLoading(false); // Stop loading once data is fetched
      },
      () => {
        toast.error(
          "Location permission is necessary for accurate times. Showing times for Dhaka."
        );
        setLoading(false); // Ensure to stop loading even if there is an error
      }
    );

    return () => clearInterval(intervalId);
  }, [method]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const { nextPrayer, timeLeft } = getNextPrayerTime(
        times,
        format(new Date(), "HH:mm:ss")
      );
      setNextPrayerInfo({ nextPrayer, timeLeft });
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, [times]);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "bn" : "en";
    i18n.changeLanguage(newLang);
  };
  const displayCurrentTime =
    i18n.language === "bn"
      ? translateNumberToBengali(format(new Date(), "hh:mm:ss a"))
      : format(new Date(), "hh:mm:ss a");
  return (
    <>
      <Head>
        <title>{t("salatTime")}</title>
      </Head>
      <div
        className={`min-h-screen ${
          isDarkMode ? "dark" : ""
        } bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <Toaster />
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white">
          <h2 className="text-2xl mb-4 text-center">
            {t("currentTime")}: {displayCurrentTime}
          </h2>
          {loading ? (
            <div className="fixed inset-0 dark:bg-gray-900 flex items-center justify-center z-50">
              <AiOutlineLoading className="animate-spin text-4xl text-gray-800 dark:text-gray-200" />
            </div>
          ) : (
            <>
              <h2 className="text-2xl mb-4 text-center">
                {t("prayerTimesFor")}: {locationName}
              </h2>
              <div className="text-center my-4">
                <div className="text-lg mb-2">
                  {t("nextPrayer")}:{" "}
                  <span className="font-semibold">
                    {nextPrayerInfo.nextPrayer}
                  </span>
                </div>
                <div className="text-lg">
                  {t("timeLeft")}:{" "}
                  <span className="font-semibold">
                    {nextPrayerInfo.timeLeft}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mb-2">
                <TimeFormatToggle
                  isTwelveHourFormat={isTwelveHourFormat}
                  toggleTimeFormat={() =>
                    setIsTwelveHourFormat(!isTwelveHourFormat)
                  }
                />
                <button
                  onClick={toggleLanguage}
                  className="mb-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {i18n.language === "en" ? "বাংলা" : "English"}
                </button>
              </div>
              <div className="my-2 flex flex-col items-center justify-center">
                <p className="text-lg">{t("calculationMethod")}</p>
                <select
                  onChange={(e) => setMethod(e.target.value)}
                  value={method}
                  className="w-full md:w-64 p-2 border-2 border-gray-300 rounded-lg dark:bg-gray-900"
                >
                  {methods.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mx-4">
                {Object.entries(times).map(([key, value]) => (
                  <PrayerCard
                    key={key}
                    prayerName={key}
                    time={toggleTimeFormat(value, isTwelveHourFormat)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
