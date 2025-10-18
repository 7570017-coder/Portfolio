import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from "@react-spring/web";
import Header from "./components/Layout/Header";
import MobileNav from "./components/Layout/MobileNav";
import LeftPanel from "./components/Sections/LeftPanel";
import IntroSection from "./components/Sections/IntroSection";
import WorkSection from "./components/Sections/WorkSection";
import ContactSection from "./components/Sections/ContactSection";
import BackgroundEffects from "./components/UI/BackgroundEffects";
import GeometricShapes from "./components/UI/GeometricShapes";
import InteractiveDots from "./components/UI/InteractiveDots";
import { useTheme } from "./hooks/useTheme";
import { useLanguage } from "./hooks/useLanguage";
import { useDotPhysics } from "./hooks/useDotPhysics";
import { useIsMobile } from "./hooks/useMediaQuery";
import "./styles/globals.css";

function App() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mounted, setMounted] = useState(false);

  const { isDark, toggleTheme } = useTheme();
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
  const { dots, handleDotMouseDown } = useDotPhysics(mounted, isMobile);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeSection = (section) => {
    setActiveSection(section);
  };

  const leftAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 220, friction: 30 },
    delay: 100,
  });

  const contentAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: {
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0px)" : "translateY(40px)",
    },
    config: { tension: 220, friction: 30 },
  });

  if (!mounted) {
    return (
      <div className="h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 dark:from-slate-950 dark:via-purple-950 dark:to-blue-950" />
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
    <div className="h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 dark:from-slate-950 dark:via-purple-950 dark:to-blue-950 text-gray-900 dark:text-white transition-colors duration-700">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <BackgroundEffects />
        <GeometricShapes />
        <InteractiveDots
          dots={dots}
          handleDotMouseDown={handleDotMouseDown}
          isDark={isDark}
          mounted={mounted}
          isMobile={isMobile}
        />
      </div>

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

      <main className="h-full flex items-center justify-center px-4 md:px-8 pt-28 md:pt-28 pb-8 overflow-y-auto md:overflow-hidden">
        <div className="max-w-7xl w-full h-full md:h-auto grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center md:items-center">
          <LeftPanel
            animation={leftAnimation}
            isDark={isDark}
            onSectionChange={changeSection}
            t={t}
          />
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
