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
      {/* Ultra Dynamic Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Vibrant Gradient Orbs - Light Theme */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-400 dark:from-violet-600 dark:via-fuchsia-600 dark:to-pink-600 rounded-full blur-3xl opacity-30 dark:opacity-20 animate-[pulse_8s_ease-in-out_infinite]" />

        <div
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-400 via-blue-400 to-indigo-400 dark:from-cyan-600 dark:via-blue-600 dark:to-indigo-600 rounded-full blur-3xl opacity-30 dark:opacity-20 animate-[pulse_10s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-rose-400 via-orange-300 to-amber-400 dark:from-rose-600 dark:via-orange-500 dark:to-amber-500 rounded-full blur-3xl opacity-25 dark:opacity-15 animate-[pulse_12s_ease-in-out_infinite]"
          style={{ animationDelay: "4s" }}
        />

        {/* Additional Floating Orbs */}
        <div
          className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-600 rounded-full blur-3xl opacity-25 dark:opacity-15 animate-[pulse_9s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
        />

        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400 via-violet-400 to-indigo-400 dark:from-purple-600 dark:via-violet-600 dark:to-indigo-600 rounded-full blur-3xl opacity-25 dark:opacity-15 animate-[pulse_11s_ease-in-out_infinite]"
          style={{ animationDelay: "3s" }}
        />

        {/* Animated Geometric Shapes - ADJUST POSITIONS HERE */}
        {/* First shape: circles with dashed borders - Change top/bottom and left/right percentages */}
        <div className="absolute top-[17%] left-[12.5%] w-64 h-64 md:w-80 md:h-80">
          <div
            className="absolute inset-0 border-2 border-dashed border-fuchsia-400/40 dark:border-fuchsia-400/30 rounded-full animate-[spin_25s_linear_infinite]"
            style={{ strokeDasharray: "10 20" }}
          />
          <div className="absolute inset-6 md:inset-8 border-2 border-dotted border-violet-400/40 dark:border-violet-400/30 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
          <div
            className="absolute inset-12 md:inset-16 border-2 border-dashed border-cyan-400/40 dark:border-cyan-400/30 rounded-full animate-[spin_30s_linear_infinite]"
            style={{ strokeDasharray: "5 15" }}
          />

          {/* Orbiting dots on circles */}
          <div className="absolute inset-0 animate-[spin_25s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 md:w-4 md:h-4 md:-ml-2 md:-mt-2 bg-fuchsia-500 dark:bg-fuchsia-400 rounded-full shadow-lg shadow-fuchsia-500/50" />
          </div>
          <div className="absolute inset-6 md:inset-8 animate-[spin_20s_linear_infinite_reverse]">
            <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 md:w-4 md:h-4 md:-ml-2 md:-mt-2 bg-violet-500 dark:bg-violet-400 rounded-full shadow-lg shadow-violet-500/50" />
          </div>
          <div className="absolute inset-12 md:inset-16 animate-[spin_30s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 md:w-4 md:h-4 md:-ml-2 md:-mt-2 bg-cyan-500 dark:bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50" />
          </div>
        </div>

        {/* Second shape: squares with gradient borders - no dots */}
        <div className="absolute bottom-[15%] right-[10%] w-56 h-56 md:w-72 md:h-72">
          {/* Outer square */}
          <div className="absolute inset-0 animate-[spin_22s_linear_infinite]">
            <div className="absolute inset-0 border-2 border-dashed border-rose-400/40 dark:border-rose-400/30 rotate-45" />
          </div>

          {/* Inner square - calculated to have corners touch outer square sides when rotated 45° */}
          <div className="absolute inset-[14.6%] animate-[spin_18s_linear_infinite_reverse]">
            <div className="absolute inset-0 border-2 border-dotted border-orange-400/40 dark:border-orange-400/30 rotate-45" />
          </div>
        </div>

        {/* Interactive Floating Dots - PLAYABLE */}
        <div className="absolute inset-0 z-10">
          {/* Layer 1 - Slow moving dots */}
          <div
            className="absolute top-[15%] left-[20%] w-3 h-3 bg-violet-500/70 dark:bg-violet-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "6s", animationDelay: "0s" }}
          />
          <div
            className="absolute top-[25%] right-[30%] w-4 h-4 bg-fuchsia-500/70 dark:bg-fuchsia-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "7s", animationDelay: "1s" }}
          />
          <div
            className="absolute top-[45%] left-[15%] w-3.5 h-3.5 bg-cyan-500/70 dark:bg-cyan-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "8s", animationDelay: "2s" }}
          />
          <div
            className="absolute top-[60%] right-[25%] w-3 h-3 bg-rose-500/70 dark:bg-rose-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "6.5s", animationDelay: "0.5s" }}
          />
          <div
            className="absolute top-[75%] left-[35%] w-4 h-4 bg-amber-500/70 dark:bg-amber-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "7.5s", animationDelay: "1.5s" }}
          />

          {/* Layer 2 - Medium speed dots */}
          <div
            className="absolute top-[20%] right-[15%] w-3.5 h-3.5 bg-indigo-500/70 dark:bg-indigo-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "5s", animationDelay: "0.3s" }}
          />
          <div
            className="absolute top-[35%] left-[40%] w-3 h-3 bg-emerald-500/70 dark:bg-emerald-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "5.5s", animationDelay: "1.2s" }}
          />
          <div
            className="absolute top-[55%] right-[40%] w-4 h-4 bg-pink-500/70 dark:bg-pink-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "6s", animationDelay: "2.5s" }}
          />
          <div
            className="absolute top-[70%] left-[25%] w-3 h-3 bg-blue-500/70 dark:bg-blue-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "5.8s", animationDelay: "0.8s" }}
          />

          {/* Layer 3 - Fast moving dots */}
          <div
            className="absolute top-[30%] left-[60%] w-3 h-3 bg-purple-500/70 dark:bg-purple-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "4s", animationDelay: "0.2s" }}
          />
          <div
            className="absolute top-[50%] right-[20%] w-3.5 h-3.5 bg-teal-500/70 dark:bg-teal-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "4.5s", animationDelay: "1.8s" }}
          />
          <div
            className="absolute top-[80%] left-[50%] w-3 h-3 bg-orange-500/70 dark:bg-orange-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "4.2s", animationDelay: "2.2s" }}
          />
          <div
            className="absolute top-[40%] right-[35%] w-4 h-4 bg-sky-500/70 dark:bg-sky-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "4.8s", animationDelay: "1.5s" }}
          />

          {/* Additional dots for fuller background */}
          <div
            className="absolute top-[10%] left-[45%] w-3 h-3 bg-lime-500/70 dark:bg-lime-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "6.2s", animationDelay: "0.7s" }}
          />
          <div
            className="absolute top-[65%] right-[45%] w-3.5 h-3.5 bg-red-500/70 dark:bg-red-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "5.3s", animationDelay: "1.9s" }}
          />
          <div
            className="absolute top-[85%] left-[60%] w-3 h-3 bg-yellow-500/70 dark:bg-yellow-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "6.8s", animationDelay: "2.3s" }}
          />
          <div
            className="absolute top-[12%] right-[50%] w-4 h-4 bg-green-500/70 dark:bg-green-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "5.6s", animationDelay: "1.1s" }}
          />
          <div
            className="absolute top-[48%] left-[8%] w-3 h-3 bg-violet-500/70 dark:bg-violet-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "7.2s", animationDelay: "0.4s" }}
          />
          <div
            className="absolute top-[92%] right-[18%] w-3.5 h-3.5 bg-fuchsia-500/70 dark:bg-fuchsia-400/50 rounded-full animate-float cursor-pointer"
            style={{ animationDuration: "4.9s", animationDelay: "2.7s" }}
          />
        </div>

        {/* Animated Waves - Light mode emphasis */}
        <div className="absolute inset-0 opacity-60 dark:opacity-30">
          <div className="absolute bottom-0 left-0 right-0 h-64">
            <svg
              className="absolute bottom-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 C300,90 600,10 900,50 C1050,70 1150,60 1200,50 L1200,120 L0,120 Z"
                fill="url(#wave1)"
                opacity="0.4"
              >
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="M0,50 C300,90 600,10 900,50 C1050,70 1150,60 1200,50 L1200,120 L0,120 Z;M0,50 C300,10 600,90 900,50 C1050,40 1150,70 1200,50 L1200,120 L0,120 Z;M0,50 C300,90 600,10 900,50 C1050,70 1150,60 1200,50 L1200,120 L0,120 Z"
                />
              </path>
              <path
                d="M0,70 C300,30 600,100 900,70 C1050,50 1150,80 1200,70 L1200,120 L0,120 Z"
                fill="url(#wave2)"
                opacity="0.3"
              >
                <animate
                  attributeName="d"
                  dur="15s"
                  repeatCount="indefinite"
                  values="M0,70 C300,30 600,100 900,70 C1050,50 1150,80 1200,70 L1200,120 L0,120 Z;M0,70 C300,100 600,30 900,70 C1050,90 1150,50 1200,70 L1200,120 L0,120 Z;M0,70 C300,30 600,100 900,70 C1050,50 1150,80 1200,70 L1200,120 L0,120 Z"
                />
              </path>
              <defs>
                <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    className="wave-start-light"
                    stopColor="rgb(167, 139, 250)"
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="100%"
                    className="wave-end-light"
                    stopColor="rgb(236, 72, 153)"
                    stopOpacity="0.8"
                  />
                </linearGradient>
                <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    className="wave-start-light"
                    stopColor="rgb(59, 130, 246)"
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="100%"
                    className="wave-end-light"
                    stopColor="rgb(168, 85, 247)"
                    stopOpacity="0.8"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Mesh Grid with Color */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(167,139,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(167,139,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent)]" />

        {/* Radial Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
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
