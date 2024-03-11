import "../lib/i18n"; // Import your i18n configuration
import { useState, useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Theme setup
    const currentTheme = localStorage.getItem("theme") ?? "light";
    setTheme(currentTheme);
    document.documentElement.classList.add(currentTheme);
  }, []);

  const toggleTheme = () => {
    // Theme toggle logic
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  // No changes needed here for i18next; it's initialized through the import
  return (
    <div>
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </div>
  );
}

export default MyApp;
