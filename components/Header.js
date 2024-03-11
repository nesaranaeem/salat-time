import { FaMoon, FaSun } from "react-icons/fa";

const Header = ({ isDarkMode, toggleTheme }) => (
  <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <h1 className="text-xl">Prayer Times</h1>
    <button onClick={toggleTheme} className="text-xl">
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  </header>
);

export default Header;
