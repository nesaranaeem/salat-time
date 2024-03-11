// lib/isRamadan.js
import { isWithinInterval, parseISO } from "date-fns";

/**
 * Determines whether the current date is within the Ramadan period.
 * Note: Update the `start` and `end` values every year based on the lunar calendar.
 */
const isRamadan = (currentDate) => {
  const ramadanPeriod = {
    start: parseISO("2024-03-12"),
    end: parseISO("2024-04-10"),
  };

  return isWithinInterval(currentDate, ramadanPeriod);
};

export default isRamadan;
