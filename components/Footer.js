import React from "react";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow p-4 text-center">
      <p className="text-base font-bold">Disclaimer</p>
      <p className="text-base text-gray-700 dark:text-gray-300">
        {t("disclaimer")}
      </p>
      <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-2">
        {t("developedBy")} Nesar Ahmed Naeem
        <a
          target="_blank"
          href="https://github.com/nesaranaeem/salat-time"
          className="ml-2 text-blue-500 text-lg flex justify-center items-center py-2"
        >
          <FaGithub />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
