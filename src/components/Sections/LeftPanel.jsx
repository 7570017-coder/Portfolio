import { Github, Linkedin, Mail, Send } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { animated } from "@react-spring/web";
import CountUp from "../UI/CountUp";
import MagicBento from "../UI/MagicBento";

function LeftPanel({ animation, isDark, onSectionChange, t }) {
  const socialLinks = [
    { icon: Github, href: "https://github.com/7570017-coder", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/khanh-vo-92508b388",
      label: "LinkedIn",
    },
    {
      icon: Send,
      href: "https://t.me/KhvnhVo",
      label: "Telegram",
    },
    {
      icon: Mail,
      href: "mailto:khanhvo.kaly@gmail.com",
      label: "Email",
    },
  ];

  return (
    <animated.div
      style={animation}
      className="md:col-span-2 flex items-center justify-center w-full mt-4 md:mt-0"
    >
      <div className="w-full max-w-md backdrop-blur-xl bg-white/60 dark:bg-white/5 border-2 border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-6 transition-[background,border] duration-300">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <img
              src="/photo_2025-10-10_14-57-31.jpg"
              alt="Avatar"
              className="w-full h-full object-cover rounded-2xl border-4 border-gray-600/80 dark:border-gray-400/80 shadow-2xl transition-colors duration-300"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 pointer-events-none" />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold mb-1">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("left.name")}
              </span>
            </h1>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {t("left.role")}
            </p>
          </div>
        </div>

        {/* Role and Company */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("left.currentWork")}{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Orbit Technology.
            </span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid-container-small">
          <MagicBento
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            disableAnimations={false}
            spotlightRadius={300}
            particleCount={100}
            enableTilt={true}
            glowColor={isDark ? "132, 0, 255" : "59, 130, 246"}
            clickEffect={true}
            enableMagnetism={true}
            cards={[
              {
                color: "transparent",
                title: (
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    <CountUp end={5} />+
                  </div>
                ),
                description: t("left.stats.projects"),
                label: "",
              },
              {
                color: "transparent",
                title: (
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    <CountUp end={4} />+
                  </div>
                ),
                description: t("left.stats.years"),
                label: "",
              },
              {
                color: "transparent",
                title: (
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    <CountUp end={20} />+
                  </div>
                ),
                description: t("left.stats.clients"),
                label: "",
              },
            ]}
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onSectionChange("work")}
            className="flex-1 px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-2xl hover:scale-105 transition-[transform,box-shadow] duration-300 border border-white/40"
          >
            {t("left.buttons.viewWork")}
          </button>
          <button
            onClick={() => onSectionChange("contact")}
            className="flex-1 px-6 py-3 backdrop-blur-xl bg-white/50 dark:bg-white/10 border border-white/50 dark:border-white/20 rounded-xl text-sm font-medium hover:bg-white/70 dark:hover:bg-white/20 hover:scale-105 transition-[background,border,transform] duration-300"
          >
            {t("left.buttons.contact")}
          </button>
        </div>

        {/* Social Links */}
        <div className="flex gap-3 flex-wrap">
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              className="p-3 backdrop-blur-xl bg-white/60 dark:bg-white/10 border border-white/60 dark:border-white/20 rounded-xl hover:bg-white/80 dark:hover:bg-white/20 hover:scale-110 transition-[background,border,transform] duration-300 shadow-lg"
            >
              <social.icon
                size={20}
                strokeWidth={2}
                className="transition-colors duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </animated.div>
  );
}

export default LeftPanel;
