import { useState, useCallback } from "react";
import { translations } from "../data/translations";

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
  };

  const t = useCallback(
    (path) => {
      const keys = path.split(".");
      let value = translations[currentLanguage];

      for (const key of keys) {
        value = value?.[key];
      }

      return value || translations.en[keys[0]]?.[keys[1]] || path;
    },
    [currentLanguage]
  );

  return { currentLanguage, changeLanguage, t };
};
