const TimeFormatToggle = ({ isTwelveHourFormat, toggleTimeFormat }) => (
  <button
    onClick={toggleTimeFormat}
    className="mb-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    {isTwelveHourFormat
      ? "Switch to 24-Hour Format"
      : "Switch to 12-Hour Format"}
  </button>
);

export default TimeFormatToggle;
