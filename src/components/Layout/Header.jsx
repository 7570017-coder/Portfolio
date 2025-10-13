import { Sun, Moon, Send } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

function Header({
  activeSection,
  onSectionChange,
  isDark,
  onThemeToggle,
  currentLanguage,
  onLanguageChange,
  t,
}) {
  return (
    <header className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto">
      <nav className="backdrop-blur-2xl bg-white/50 dark:bg-black/20 border border-white/40 dark:border-white/10 rounded-full px-2 py-2 shadow-2xl shadow-black/10 transition-[background,border] duration-300">
        <div className="flex items-center gap-2">
          {["intro", "work", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-[background,transform] duration-300 ${
                activeSection === section
                  ? "bg-white/60 dark:bg-white/10 backdrop-blur-xl shadow-lg"
                  : "hover:bg-white/40 dark:hover:bg-white/5"
              }`}
            >
              <span
                className={
                  activeSection === section
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                {t(`nav.${section}`)}
              </span>
            </button>
          ))}

          <div className="w-px h-6 bg-gray-300/50 dark:bg-gray-700/50 mx-2 transition-colors duration-300" />

          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          <a
            href="https://t.me/KhvnhVo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 backdrop-blur-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 rounded-full transition-[background,border,transform] duration-300 border border-white/40 dark:border-white/20 hover:scale-110"
            title="Telegram"
          >
            <Send
              size={18}
              className="text-blue-600 dark:text-blue-400 transition-colors duration-300"
            />
          </a>

          <button
            onClick={onThemeToggle}
            className="p-2.5 backdrop-blur-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 rounded-full transition-[background,border,transform] duration-300 border border-white/40 dark:border-white/20 hover:scale-110"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={18} className="transition-colors duration-300" />
            ) : (
              <Moon size={18} className="transition-colors duration-300" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
