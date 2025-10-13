import { Globe, ChevronDown } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRef, useState } from "react";
import { languageOptions } from "../../data/translations";

function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  isMobile = false,
}) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageSelectorRef = useRef(null);

  useClickOutside(languageSelectorRef, () => {
    setIsLanguageOpen(false);
  });

  const currentLang = languageOptions.find(
    (lang) => lang.code === currentLanguage
  );

  const handleLanguageChange = (langCode) => {
    onLanguageChange(langCode);
    setIsLanguageOpen(false);
  };

  if (isMobile) {
    return (
      <div className="relative" ref={languageSelectorRef}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLanguageOpen(!isLanguageOpen);
          }}
          className="flex items-center justify-between w-full px-4 py-3 backdrop-blur-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 rounded-xl transition-[background] duration-300"
        >
          <div className="flex items-center gap-3">
            <Globe size={18} className="transition-colors duration-300" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {currentLang.flag} Language
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ChevronDown
              size={16}
              className={`transition-[transform] duration-300 ${
                isLanguageOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {isLanguageOpen && (
          <div className="mt-2 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/40 dark:border-white/10 rounded-xl py-2 shadow-2xl shadow-black/20 z-50 transition-[background,border] duration-300">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={(e) => {
                  e.preventDefault();
                  handleLanguageChange(lang.code);
                }}
                className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-[background] duration-300 ${
                  currentLanguage === lang.code
                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 "
                    : "hover:bg-white/40 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={languageSelectorRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsLanguageOpen(!isLanguageOpen);
        }}
        className="flex items-center gap-2 px-4 py-2.5 backdrop-blur-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 rounded-full transition-[background,border] duration-300 border border-white/40 dark:border-white/20"
      >
        <Globe size={16} className="transition-colors duration-300" />
        <span className="text-sm font-medium">{currentLang.flag}</span>
        <ChevronDown
          size={16}
          className={`transition-[transform] duration-300 ${
            isLanguageOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isLanguageOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 backdrop-blur-2xl bg-white/80 dark:bg-black/60 border border-white/40 dark:border-white/10 rounded-2xl py-2 shadow-2xl shadow-black/20 min-w-[140px] z-50 transition-[background,border] duration-300">
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={(e) => {
                e.preventDefault();
                handleLanguageChange(lang.code);
              }}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-[background] duration-300 ${
                currentLanguage === lang.code
                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                  : "hover:bg-white/40 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
