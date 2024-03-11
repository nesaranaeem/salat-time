import axios from "axios";

const reverseGeocodeOSM = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat: latitude,
          lon: longitude,
          zoom: 18, // This zoom level is good for getting detailed information
          addressdetails: 1,
        },
        headers: {
          "User-Agent": "prayer time, version 1.0 email me@nesar.com",
        },
      }
    );

    const address = response.data.address;
    const state = address.state || "State unavailable";
    const country = address.country || "Country unavailable";

    return `${state}, ${country}`;
  } catch (error) {
    console.error("Error fetching location name with OpenStreetMap:", error);
    return "Location details unavailable";
  }
};

export default reverseGeocodeOSM;
