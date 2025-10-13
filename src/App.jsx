import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from "@react-spring/web";
import Header from "./components/Layout/Header";
import MobileNav from "./components/Layout/MobileNav";
import LeftPanel from "./components/Sections/LeftPanel";
import IntroSection from "./components/Sections/IntroSection";
import WorkSection from "./components/Sections/WorkSection";
import ContactSection from "./components/Sections/ContactSection";
import { translations } from "./data/translations";
import "./styles/globals.css";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("intro");
  const [mounted, setMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const changeSection = (section) => {
    setActiveSection(section);
  };

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
  };

  // Helper function to get translated text
  const t = (path) => {
    const keys = path.split(".");
    let value = translations[currentLanguage];

    for (const key of keys) {
      value = value?.[key];
    }

    return value || translations.en[keys[0]]?.[keys[1]] || path;
  };

  const leftAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 220, friction: 30 },
    delay: 100,
  });

  const contentAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    reset: true,
    config: { tension: 220, friction: 30 },
    key: activeSection,
  });

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-150 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950" />
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "intro":
        return <IntroSection t={t} isDark={isDark} />;
      case "work":
        return <WorkSection t={t} isDark={isDark} />;
      case "contact":
        return <ContactSection t={t} isDark={isDark} />;
      default:
        return <IntroSection t={t} isDark={isDark} />;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-150 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 text-gray-900 dark:text-white transition-[background] duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-blue-500/30 dark:bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 -left-20 w-96 h-96 bg-purple-500/30 dark:bg-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 dark:bg-pink-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Navigation */}
      <Header
        activeSection={activeSection}
        onSectionChange={changeSection}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        currentLanguage={currentLanguage}
        onLanguageChange={changeLanguage}
        t={t}
      />

      <MobileNav
        activeSection={activeSection}
        onSectionChange={changeSection}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        currentLanguage={currentLanguage}
        onLanguageChange={changeLanguage}
        t={t}
      />

      {/* Main Content Grid */}
      <main className="h-full flex items-center justify-center px-4 md:px-8 pt-28 md:pt-28 pb-8 overflow-y-auto md:overflow-hidden">
        <div className="max-w-7xl w-full h-full md:h-auto grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center md:items-center">
          {/* Left Column */}
          <LeftPanel
            animation={leftAnimation}
            isDark={isDark}
            onSectionChange={changeSection}
            t={t}
          />

          {/* Right Column - Content Area */}
          <div className="md:col-span-3 h-full flex items-center w-full">
            <div className="w-full h-full flex items-center justify-center">
              <animated.div
                style={contentAnimation}
                className="h-full w-full flex flex-col"
              >
                <div className="flex-1 overflow-y-auto md:overflow-visible md:flex md:items-center md:justify-center">
                  {renderActiveSection()}
                </div>
              </animated.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
