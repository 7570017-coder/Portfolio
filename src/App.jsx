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
    { id: 1, x: 20, y: 15, size: 3, color: "violet" },
    { id: 2, x: 70, y: 25, size: 4, color: "fuchsia" },
    { id: 3, x: 15, y: 45, size: 3.5, color: "cyan" },
    { id: 4, x: 75, y: 60, size: 3, color: "rose" },
    { id: 5, x: 35, y: 75, size: 4, color: "amber" },
    { id: 6, x: 85, y: 20, size: 3.5, color: "indigo" },
    { id: 7, x: 40, y: 35, size: 3, color: "emerald" },
    { id: 8, x: 60, y: 55, size: 4, color: "pink" },
    { id: 9, x: 25, y: 70, size: 3, color: "blue" },
    { id: 10, x: 60, y: 30, size: 3, color: "purple" },
    { id: 11, x: 80, y: 50, size: 3.5, color: "teal" },
    { id: 12, x: 50, y: 80, size: 3, color: "orange" },
    { id: 13, x: 65, y: 40, size: 4, color: "sky" },
    { id: 14, x: 45, y: 10, size: 3, color: "lime" },
    { id: 15, x: 55, y: 65, size: 3.5, color: "red" },
    { id: 16, x: 60, y: 85, size: 3, color: "yellow" },
    { id: 17, x: 50, y: 12, size: 4, color: "green" },
    { id: 18, x: 8, y: 48, size: 3, color: "violet" },
    { id: 19, x: 82, y: 92, size: 3.5, color: "fuchsia" },
  ];

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("dark");

    const initializedDots = initialDots.map((dot) => ({
      ...dot,
      px: dot.x,
      py: dot.y,
      vx: 0,
      vy: 0,
      isDragging: false,
      lastMoveTime: Date.now(),
      isReturning: false,
      returnStyle: ["spring", "spiral", "bounce", "float", "pulse"][
        Math.floor(Math.random() * 5)
      ],
    }));
    setDots(initializedDots);
    dotsRef.current = initializedDots;
  }, []);

  // Physics simulation
  useEffect(() => {
    if (!mounted) return;

    const gravity = 0.08;
    const friction = 0.99;
    const restitution = 0.8;
    const bounceThreshold = 0.3;
    const groundFriction = 1;
    const returnSpeed = 0.05;

    const animate = () => {
      const now = Date.now();
      const updated = dotsRef.current.map((dot) => {
        if (dot.isDragging) return dot;
        let newDot = { ...dot };
        const timeSinceMove = now - dot.lastMoveTime;

        if (timeSinceMove > 8000 && !dot.isReturning) {
          newDot.isReturning = true;
          newDot.returnStyle = ["spring", "spiral", "bounce", "float", "pulse"][
            Math.floor(Math.random() * 5)
          ];
        }

        if (newDot.isReturning) {
          const dx = dot.x - dot.px;
          const dy = dot.y - dot.py;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          if (distance < 0.5) {
            newDot.px = dot.x;
            newDot.py = dot.y;
            newDot.vx = 0;
            newDot.vy = 0;
            newDot.isReturning = false;
          } else {
            switch (newDot.returnStyle) {
              case "spring": {
                newDot.vx += dx * returnSpeed * 0.8; // was 1.2
                newDot.vy += dy * returnSpeed * 0.8;
                newDot.vx *= 0.9;
                newDot.vy *= 0.9;
                break;
              }

              case "spiral": {
                const spiralRadius = distance * 0.95; // was 0.97
                const spiralAngle = angle + 0.15; // smaller angle = smoother swirl
                newDot.px = dot.x - Math.cos(spiralAngle) * spiralRadius;
                newDot.py = dot.y - Math.sin(spiralAngle) * spiralRadius;
                break;
              }

              case "bounce": {
                newDot.vx += dx * returnSpeed * 0.6; // was 0.8
                newDot.vy +=
                  dy * returnSpeed * 0.6 + Math.sin(now * 0.02) * 0.1; // half vertical boost
                newDot.vx *= 0.92;
                newDot.vy *= 0.92;
                break;
              }

              case "float": {
                newDot.vx += dx * returnSpeed * 0.4; // was 0.5
                newDot.vy += dy * returnSpeed * 0.4;
                newDot.py += Math.sin(now * 0.01 + dot.id) * 0.2; // gentler wobble
                newDot.vx *= 0.96;
                newDot.vy *= 0.96;
                break;
              }

              case "pulse": {
                const pulseForce =
                  (Math.sin(now * 0.015 + dot.id) + 1) * 0.01 + returnSpeed; // halved
                newDot.vx += dx * pulseForce;
                newDot.vy += dy * pulseForce;
                newDot.vx *= 0.9;
                newDot.vy *= 0.9;
                break;
              }

              default: {
                newDot.vx += dx * returnSpeed;
                newDot.vy += dy * returnSpeed;
                break;
              }
            }

            newDot.px += newDot.vx;
            newDot.py += newDot.vy;
          }
        } else {
          newDot.vy += gravity;
          newDot.vx *= friction;
          newDot.vy *= friction;

          newDot.px += newDot.vx;
          newDot.py += newDot.vy;

          if (newDot.py > 95) {
            newDot.py = 95;
            if (Math.abs(newDot.vy) < bounceThreshold) {
              newDot.vy = 0;
              newDot.vx *= groundFriction;
            } else {
              newDot.vy = -newDot.vy * restitution;
            }
          }

          if (newDot.py < 5) {
            newDot.py = 5;
            newDot.vy = -newDot.vy * restitution;
          }

          if (newDot.px > 95) {
            newDot.px = 95;
            newDot.vx = -newDot.vx * restitution;
          }

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
    return () => cancelAnimationFrame(animationFrameRef.current);
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

        <div className="absolute top-[10%] left-[5%] md:top-[17%] md:left-[12.5%] w-48 h-48 md:w-80 md:h-80 z-5">
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

        <div className="absolute bottom-[10%] right-[5%] md:bottom-[15%] md:right-[10%] w-40 h-40 md:w-72 md:h-72 z-5">
          <div className="absolute inset-0 animate-[spin_22s_linear_infinite]">
            <div className="absolute inset-0 border-2 border-dashed border-rose-400/40 dark:border-rose-400/30 rotate-45" />
          </div>
          <div className="absolute inset-[14.6%] animate-[spin_18s_linear_infinite_reverse]">
            <div className="absolute inset-0 border-2 border-dotted border-orange-400/40 dark:border-orange-400/30 rotate-45" />
          </div>
        </div>

        {/* Physics-enabled Interactive Dots - INLINE STYLES */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 9999 }}
        >
          {mounted && dots.length > 0 ? (
            dots.map((dot) => {
              // Define colors inline
              const colors = {
                violet: {
                  light: "rgba(139, 92, 246, 0.7)",
                  dark: "rgba(167, 139, 250, 0.5)",
                },
                fuchsia: {
                  light: "rgba(217, 70, 239, 0.7)",
                  dark: "rgba(232, 121, 249, 0.5)",
                },
                cyan: {
                  light: "rgba(6, 182, 212, 0.7)",
                  dark: "rgba(34, 211, 238, 0.5)",
                },
                rose: {
                  light: "rgba(244, 63, 94, 0.7)",
                  dark: "rgba(251, 113, 133, 0.5)",
                },
                amber: {
                  light: "rgba(245, 158, 11, 0.7)",
                  dark: "rgba(251, 191, 36, 0.5)",
                },
                indigo: {
                  light: "rgba(99, 102, 241, 0.7)",
                  dark: "rgba(129, 140, 248, 0.5)",
                },
                emerald: {
                  light: "rgba(16, 185, 129, 0.7)",
                  dark: "rgba(52, 211, 153, 0.5)",
                },
                pink: {
                  light: "rgba(236, 72, 153, 0.7)",
                  dark: "rgba(244, 114, 182, 0.5)",
                },
                blue: {
                  light: "rgba(59, 130, 246, 0.7)",
                  dark: "rgba(96, 165, 250, 0.5)",
                },
                purple: {
                  light: "rgba(168, 85, 247, 0.7)",
                  dark: "rgba(192, 132, 252, 0.5)",
                },
                teal: {
                  light: "rgba(20, 184, 166, 0.7)",
                  dark: "rgba(45, 212, 191, 0.5)",
                },
                orange: {
                  light: "rgba(249, 115, 22, 0.7)",
                  dark: "rgba(251, 146, 60, 0.5)",
                },
                sky: {
                  light: "rgba(14, 165, 233, 0.7)",
                  dark: "rgba(56, 189, 248, 0.5)",
                },
                lime: {
                  light: "rgba(132, 204, 22, 0.7)",
                  dark: "rgba(163, 230, 53, 0.5)",
                },
                red: {
                  light: "rgba(239, 68, 68, 0.7)",
                  dark: "rgba(248, 113, 113, 0.5)",
                },
                yellow: {
                  light: "rgba(234, 179, 8, 0.7)",
                  dark: "rgba(250, 204, 21, 0.5)",
                },
                green: {
                  light: "rgba(34, 197, 94, 0.7)",
                  dark: "rgba(74, 222, 128, 0.5)",
                },
              };

              const bgColor = isDark
                ? colors[dot.color]?.dark
                : colors[dot.color]?.light;

              return (
                <div
                  key={dot.id}
                  onMouseDown={(e) => handleDotMouseDown(e, dot.id)}
                  onTouchStart={(e) => handleDotMouseDown(e.touches[0], dot.id)}
                  style={{
                    position: "absolute",
                    left: `${dot.px}%`,
                    top: `${dot.py}%`,
                    width: `${dot.size * 4}px`,
                    height: `${dot.size * 4}px`,
                    marginLeft: `-${dot.size * 2}px`,
                    marginTop: `-${dot.size * 2}px`,
                    backgroundColor: bgColor || "rgba(139, 92, 246, 0.7)",
                    borderRadius: "50%",
                    cursor: dot.isDragging ? "grabbing" : "grab",
                    pointerEvents: "auto",
                    transform: dot.isDragging ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.2s ease",
                    zIndex: 9999,
                  }}
                />
              );
            })
          ) : (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                color: "white",
                fontSize: "20px",
              }}
            >
              Loading dots... ({dots.length})
            </div>
          )}
        </div>

        <div className="absolute inset-0 opacity-60 dark:opacity-30 z-1">
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
