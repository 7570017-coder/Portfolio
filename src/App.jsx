import { useState, useEffect, useRef } from "react";
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
  const [dots, setDots] = useState([]);
  const dotsRef = useRef([]);
  const animationFrameRef = useRef(null);

  // Initial dot positions (percentage-based)
  const initialDots = [
    { id: 1, x: 20, y: 15, size: 3, color: "violet", duration: 6, delay: 0 },
    { id: 2, x: 70, y: 25, size: 4, color: "fuchsia", duration: 7, delay: 1 },
    { id: 3, x: 15, y: 45, size: 3.5, color: "cyan", duration: 8, delay: 2 },
    { id: 4, x: 75, y: 60, size: 3, color: "rose", duration: 6.5, delay: 0.5 },
    { id: 5, x: 35, y: 75, size: 4, color: "amber", duration: 7.5, delay: 1.5 },
    {
      id: 6,
      x: 85,
      y: 20,
      size: 3.5,
      color: "indigo",
      duration: 5,
      delay: 0.3,
    },
    {
      id: 7,
      x: 40,
      y: 35,
      size: 3,
      color: "emerald",
      duration: 5.5,
      delay: 1.2,
    },
    { id: 8, x: 60, y: 55, size: 4, color: "pink", duration: 6, delay: 2.5 },
    { id: 9, x: 25, y: 70, size: 3, color: "blue", duration: 5.8, delay: 0.8 },
    { id: 10, x: 60, y: 30, size: 3, color: "purple", duration: 4, delay: 0.2 },
    {
      id: 11,
      x: 80,
      y: 50,
      size: 3.5,
      color: "teal",
      duration: 4.5,
      delay: 1.8,
    },
    {
      id: 12,
      x: 50,
      y: 80,
      size: 3,
      color: "orange",
      duration: 4.2,
      delay: 2.2,
    },
    { id: 13, x: 65, y: 40, size: 4, color: "sky", duration: 4.8, delay: 1.5 },
    { id: 14, x: 45, y: 10, size: 3, color: "lime", duration: 6.2, delay: 0.7 },
    {
      id: 15,
      x: 55,
      y: 65,
      size: 3.5,
      color: "red",
      duration: 5.3,
      delay: 1.9,
    },
    {
      id: 16,
      x: 60,
      y: 85,
      size: 3,
      color: "yellow",
      duration: 6.8,
      delay: 2.3,
    },
    {
      id: 17,
      x: 50,
      y: 12,
      size: 4,
      color: "green",
      duration: 5.6,
      delay: 1.1,
    },
    {
      id: 18,
      x: 8,
      y: 48,
      size: 3,
      color: "violet",
      duration: 7.2,
      delay: 0.4,
    },
    {
      id: 19,
      x: 82,
      y: 92,
      size: 3.5,
      color: "fuchsia",
      duration: 4.9,
      delay: 2.7,
    },
  ];

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("dark");

    // Initialize dots with physics properties
    const initializedDots = initialDots.map((dot) => ({
      ...dot,
      px: dot.x, // pixel position x
      py: dot.y, // pixel position y
      vx: 0, // velocity x
      vy: 0, // velocity y
      isDragging: false,
      lastMoveTime: Date.now(),
      isReturning: false,
    }));
    setDots(initializedDots);
    dotsRef.current = initializedDots;
  }, []);

  // Physics simulation
  useEffect(() => {
    if (!mounted) return;

    const gravity = 0.15;
    const friction = 0.99;
    const restitution = 0.7;
    const bounceThreshold = 0.3;
    const groundFriction = 0.95;
    const returnSpeed = 0.05;

    const animate = () => {
      const now = Date.now();
      const updated = dotsRef.current.map((dot) => {
        if (dot.isDragging) {
          return dot;
        }

        let newDot = { ...dot };

        // Check if dot should return to original position
        const timeSinceMove = now - dot.lastMoveTime;
        if (timeSinceMove > 10000 && !dot.isReturning) {
          newDot.isReturning = true;
        }

        if (newDot.isReturning) {
          // Smooth return with wiggle effect
          const dx = dot.x - dot.px;
          const dy = dot.y - dot.py;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 0.5) {
            // Reached destination
            newDot.px = dot.x;
            newDot.py = dot.y;
            newDot.vx = 0;
            newDot.vy = 0;
            newDot.isReturning = false;
          } else {
            // Move towards original position with spring effect
            newDot.vx += dx * returnSpeed;
            newDot.vy += dy * returnSpeed;
            newDot.vx *= 0.9;
            newDot.vy *= 0.9;

            // Add wiggle
            const wiggle = Math.sin(now * 0.01 + dot.id) * 0.3;
            newDot.px += newDot.vx + wiggle;
            newDot.py += newDot.vy;
          }
        } else {
          // Apply physics (basketball-style)
          newDot.vy += gravity;
          newDot.vx *= friction;
          newDot.vy *= friction;

          newDot.px += newDot.vx;
          newDot.py += newDot.vy;

          // Boundary collision (viewport)
          // Bottom collision
          if (newDot.py > 95) {
            newDot.py = 95;
            if (Math.abs(newDot.vy) < bounceThreshold) {
              newDot.vy = 0;
              newDot.vx *= groundFriction;
              if (Math.abs(newDot.vx) < 0.1) {
                newDot.vx = 0;
              }
            } else {
              newDot.vy = -newDot.vy * restitution;
            }
          }

          // Top collision
          if (newDot.py < 5) {
            newDot.py = 5;
            newDot.vy = -newDot.vy * restitution;
          }

          // Right collision
          if (newDot.px > 95) {
            newDot.px = 95;
            newDot.vx = -newDot.vx * restitution;
          }

          // Left collision
          if (newDot.px < 5) {
            newDot.px = 5;
            newDot.vx = -newDot.vx * restitution;
          }
        }

        return newDot;
      });

      dotsRef.current = updated;
      setDots(updated);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted]);

  const handleDotMouseDown = (e, dotId) => {
    e.preventDefault();
    const dot = dotsRef.current.find((d) => d.id === dotId);
    if (!dot) return;

    const updated = dotsRef.current.map((d) =>
      d.id === dotId
        ? { ...d, isDragging: true, vx: 0, vy: 0, isReturning: false }
        : d
    );
    dotsRef.current = updated;
    setDots(updated);

    let lastClientX = e.clientX || (e.touches && e.touches[0].clientX);
    let lastClientY = e.clientY || (e.touches && e.touches[0].clientY);
    let lastDragTime = Date.now();
    const throwSensitivity = 0.3;

    const handleMouseMove = (moveEvent) => {
      const clientX =
        moveEvent.clientX ||
        (moveEvent.touches && moveEvent.touches[0].clientX);
      const clientY =
        moveEvent.clientY ||
        (moveEvent.touches && moveEvent.touches[0].clientY);

      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;

      const now = Date.now();
      const dt = now - lastDragTime;

      if (dt > 0) {
        const vx = ((clientX - lastClientX) / dt) * 16 * throwSensitivity;
        const vy = ((clientY - lastClientY) / dt) * 16 * throwSensitivity;

        const updatedMove = dotsRef.current.map((d) =>
          d.id === dotId ? { ...d, px: x, py: y, vx, vy } : d
        );
        dotsRef.current = updatedMove;
        setDots(updatedMove);
      }

      lastClientX = clientX;
      lastClientY = clientY;
      lastDragTime = now;
    };

    const handleMouseUp = () => {
      const updatedUp = dotsRef.current.map((d) =>
        d.id === dotId
          ? { ...d, isDragging: false, lastMoveTime: Date.now() }
          : d
      );
      dotsRef.current = updatedUp;
      setDots(updatedUp);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
  };

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
    to: {
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0px)" : "translateY(40px)",
    },
    config: { tension: 220, friction: 30 },
    key: activeSection,
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
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-400 dark:from-violet-600 dark:via-fuchsia-600 dark:to-pink-600 rounded-full blur-3xl opacity-30 dark:opacity-20 animate-[pulse_8s_ease-in-out_infinite]" />
        <div
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-400 via-blue-400 to-indigo-400 dark:from-cyan-600 dark:via-blue-600 dark:to-indigo-600 rounded-full blur-3xl opacity-30 dark:opacity-20 animate-[pulse_10s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-rose-400 via-orange-300 to-amber-400 dark:from-rose-600 dark:via-orange-500 dark:to-amber-500 rounded-full blur-3xl opacity-25 dark:opacity-15 animate-[pulse_12s_ease-in-out_infinite]"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-600 rounded-full blur-3xl opacity-25 dark:opacity-15 animate-[pulse_9s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400 via-violet-400 to-indigo-400 dark:from-purple-600 dark:via-violet-600 dark:to-indigo-600 rounded-full blur-3xl opacity-25 dark:opacity-15 animate-[pulse_11s_ease-in-out_infinite]"
          style={{ animationDelay: "3s" }}
        />

        <div className="absolute top-[10%] left-[5%] md:top-[17%] md:left-[12.5%] w-48 h-48 md:w-80 md:h-80">
          <div
            className="absolute inset-0 border-2 border-dashed border-fuchsia-400/40 dark:border-fuchsia-400/30 rounded-full animate-[spin_25s_linear_infinite]"
            style={{ strokeDasharray: "10 20" }}
          />
          <div className="absolute inset-4 md:inset-8 border-2 border-dotted border-violet-400/40 dark:border-violet-400/30 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
          <div
            className="absolute inset-8 md:inset-16 border-2 border-dashed border-cyan-400/40 dark:border-cyan-400/30 rounded-full animate-[spin_30s_linear_infinite]"
            style={{ strokeDasharray: "5 15" }}
          />
          <div className="absolute inset-0 animate-[spin_25s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 md:w-4 md:h-4 md:-ml-2 md:-mt-2 bg-fuchsia-500 dark:bg-fuchsia-400 rounded-full shadow-lg shadow-fuchsia-500/50" />
          </div>
          <div className="absolute inset-4 md:inset-8 animate-[spin_20s_linear_infinite_reverse]">
            <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 md:w-4 md:h-4 md:-ml-2 md:-mt-2 bg-violet-500 dark:bg-violet-400 rounded-full shadow-lg shadow-violet-500/50" />
          </div>
          <div className="absolute inset-8 md:inset-16 animate-[spin_30s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 md:w-4 md:h-4 md:-ml-2 md:-mt-2 bg-cyan-500 dark:bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50" />
          </div>
        </div>

        <div className="absolute bottom-[10%] right-[5%] md:bottom-[15%] md:right-[10%] w-40 h-40 md:w-72 md:h-72">
          <div className="absolute inset-0 animate-[spin_22s_linear_infinite]">
            <div className="absolute inset-0 border-2 border-dashed border-rose-400/40 dark:border-rose-400/30 rotate-45" />
          </div>
          <div className="absolute inset-[14.6%] animate-[spin_18s_linear_infinite_reverse]">
            <div className="absolute inset-0 border-2 border-dotted border-orange-400/40 dark:border-orange-400/30 rotate-45" />
          </div>
        </div>

        {/* Physics-enabled Interactive Dots */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {dots.map((dot) => (
            <div
              key={dot.id}
              onMouseDown={(e) => handleDotMouseDown(e, dot.id)}
              onTouchStart={(e) => handleDotMouseDown(e.touches[0], dot.id)}
              className={`absolute bg-${dot.color}-500/70 dark:bg-${
                dot.color
              }-400/50 rounded-full cursor-grab active:cursor-grabbing pointer-events-auto transition-shadow hover:shadow-lg hover:shadow-${
                dot.color
              }-500/50 ${dot.isDragging ? "scale-110" : ""} ${
                dot.isReturning ? "animate-wiggle" : ""
              }`}
              style={{
                left: `${dot.px}%`,
                top: `${dot.py}%`,
                width: `${dot.size * 4}px`,
                height: `${dot.size * 4}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

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

        <div className="absolute inset-0 bg-[linear-gradient(rgba(167,139,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(167,139,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
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
