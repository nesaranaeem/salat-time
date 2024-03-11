import { format, parse } from "date-fns";

/**
 * Converts a time string from 24-hour to 12-hour format and vice versa.
 *
 * @param {string} time - The time string to convert (e.g., "14:00" or "2:00 PM").
 * @param {boolean} toTwelveHourFormat - Whether to convert to 12-hour format.
 * @returns {string} - The converted time string.
 */
const toggleTimeFormat = (time, toTwelveHourFormat = true) => {
  // Assume the input is in 24-hour format if it doesn't contain AM/PM
  const isCurrentlyTwelveHourFormat =
    time.toLowerCase().includes("am") || time.toLowerCase().includes("pm");

  if (toTwelveHourFormat && !isCurrentlyTwelveHourFormat) {
    // Convert from 24-hour to 12-hour format
    const parsedTime = parse(time, "HH:mm", new Date());
    return format(parsedTime, "hh:mm a"); // e.g., "02:00 PM"
  } else if (!toTwelveHourFormat && isCurrentlyTwelveHourFormat) {
    // Convert from 12-hour to 24-hour format
    const parsedTime = parse(time, "hh:mm a", new Date());
    return format(parsedTime, "HH:mm"); // e.g., "14:00"
  }

  // If no conversion is needed, return the original time string
  return time;
};

export default toggleTimeFormat;
