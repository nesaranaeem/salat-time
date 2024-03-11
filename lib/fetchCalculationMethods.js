import axios from "axios";

const fetchCalculationMethods = async () => {
  try {
    const response = await axios.get("https://api.aladhan.com/v1/methods");
    const methods = response.data.data;
    // Exclude the "CUSTOM" method
    const filteredMethods = Object.keys(methods).reduce((acc, key) => {
      if (key !== "CUSTOM") {
        acc[key] = methods[key];
      }
      return acc;
    }, {});
    return filteredMethods;
  } catch (error) {
    console.error("Error fetching calculation methods:", error);
    return {};
  }
};

export default fetchCalculationMethods;
