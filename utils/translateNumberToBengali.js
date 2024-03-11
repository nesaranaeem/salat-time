// utils/translateNumberToBengali.js
const translateNumberToBengali = (numberString) => {
  const engToBnDigit = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  return numberString.toString().replace(/\d/g, (match) => engToBnDigit[match]);
};

export default translateNumberToBengali;
