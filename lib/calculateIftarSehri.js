// calculateIftarSehri.js
import { parse, format, addMinutes } from "date-fns";

/**
 * Adjusts the Fajr and Maghrib prayer times to calculate Sehri and Iftar times.
 * @param {Object} timings - The original prayer times.
 * @returns {Object} - The modified times for Sehri and Iftar.
 */
const calculateIftarSehri = (timings) => {
  // Ensure the timings for Fajr and Maghrib are available
  if (!timings.Fajr || !timings.Maghrib) {
    console.error("Fajr and Maghrib times are required for calculation.");
    return { Sehri: "Unavailable", Iftar: "Unavailable" };
  }

  const sehriTime = addMinutes(parse(timings.Fajr, "HH:mm", new Date()), -6);
  const iftarTime = addMinutes(parse(timings.Maghrib, "HH:mm", new Date()), 3);

  return {
    Sehri: format(sehriTime, "HH:mm"),
    Iftar: format(iftarTime, "HH:mm"),
  };
};

export default calculateIftarSehri;
