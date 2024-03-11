import {
  parseISO,
  format,
  isBefore,
  addDays,
  differenceInSeconds,
} from "date-fns";

export const getNextPrayerTime = (times, currentTime) => {
  // Parse the current time
  const now = parseISO(format(new Date(), "yyyy-MM-dd") + "T" + currentTime);

  // Define an array of prayer names to iterate over, excluding Sunrise
  const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  let nextPrayer = "";
  let timeLeft = "";

  for (const prayer of prayerNames) {
    let prayerTime = parseISO(
      format(new Date(), "yyyy-MM-dd") + "T" + times[prayer]
    );

    if (isBefore(now, prayerTime)) {
      nextPrayer = prayer;
      const secondsLeft = differenceInSeconds(prayerTime, now);
      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      timeLeft = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      break;
    }
  }

  // If no next prayer found for today (e.g., after Isha), show time left until Fajr next day
  if (!nextPrayer) {
    nextPrayer = "Fajr";
    let tomorrowFajrTime = addDays(
      parseISO(format(new Date(), "yyyy-MM-dd") + "T" + times["Fajr"]),
      1
    );
    const secondsLeft = differenceInSeconds(tomorrowFajrTime, now);
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    timeLeft = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return { nextPrayer, timeLeft };
};
