import React from "react";
import { useTranslation } from "react-i18next";

const TimeFormatToggle = ({ isTwelveHourFormat, toggleTimeFormat }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTimeFormat}
      className="mb-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
    >
      {isTwelveHourFormat
        ? t("switchTo24HourFormat") // Use translation key
        : t("switchTo12HourFormat")}{" "}
    </button>
  );
};

export default TimeFormatToggle;
