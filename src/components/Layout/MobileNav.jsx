import { useState } from "react";
import { Sun, Moon, Send, Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

function MobileNav({
  activeSection,
  onSectionChange,
  isDark,
  onThemeToggle,
  currentLanguage,
  onLanguageChange,
  t,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeSection = (section) => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <nav className="backdrop-blur-2xl bg-white/90 dark:bg-slate-900/95 border border-white/40 dark:border-white/10 rounded-full px-4 py-3 shadow-2xl shadow-black/10 transition-[background,border] duration-300">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 backdrop-blur-xl bg-white/50 dark:bg-white/10 rounded-full transition-[background,border,transform] duration-300 border border-white/40 dark:border-white/20 hover:scale-110"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="transition-colors duration-300" />
            ) : (
              <Menu size={20} className="transition-colors duration-300" />
            )}
          </button>

          <span className="text-sm font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t(`nav.${activeSection}`)}
          </span>

          <button
            onClick={onThemeToggle}
            className="p-2 backdrop-blur-xl bg-white/50 dark:bg-white/10 rounded-full transition-[background,border,transform] duration-300 border border-white/40 dark:border-white/20 hover:scale-110"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={20} className="transition-colors duration-300" />
            ) : (
              <Moon size={20} className="transition-colors duration-300" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/40 dark:border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/20 z-50 transition-[background,border] duration-300">
            <div className="space-y-3">
              {["intro", "work", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => changeSection(section)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-[background] duration-300 ${
                    activeSection === section
                      ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 backdrop-blur-xl shadow-lg"
                      : "hover:bg-white/40 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="font-semibold">{t(`nav.${section}`)}</span>
                </button>
              ))}

              <div className="border-t border-gray-300/50 dark:border-gray-700/50 my-2 transition-colors duration-300" />

              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
                isMobile={true}
              />

              <a
                href="https://t.me/KhvnhVo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-3 backdrop-blur-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 rounded-xl transition-[background] duration-300"
              >
                <Send
                  size={18}
                  className="text-blue-600 dark:text-blue-400 transition-colors duration-300"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Telegram
                </span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default MobileNav;
