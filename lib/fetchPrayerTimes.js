import axios from "axios";

const getPrayerTimes = async (latitude, longitude, date, method = 3) => {
  const response = await axios.get(
    `https://api.aladhan.com/v1/timings/${date}`,
    {
      params: {
        latitude,
        longitude,
        method, // Now method can be dynamically set
      },
    }
  );

  const { data } = response;
  const { timings } = data.data;

  // Return only the specific prayer times
  return {
    Fajr: timings.Fajr,
    Sunrise: timings.Sunrise,
    Dhuhr: timings.Dhuhr,
    Asr: timings.Asr,
    Maghrib: timings.Maghrib,
    Isha: timings.Isha,
  };
};

export default getPrayerTimes;
