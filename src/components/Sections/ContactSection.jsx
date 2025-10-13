import { Mail } from "lucide-react";
import MagicBento from "../UI/MagicBento";

function ContactSection({ t, isDark }) {
  return (
    <div className="space-y-6 px-4 md:px-8 py-4 md:py-0">
      <h2 className="text-2xl md:text-3xl font-bold">{t("contact.title")}</h2>

      <p className="text-base md:text-lg text-gray-800 dark:text-gray-300 mb-6 font-medium">
        {t("contact.description")}
      </p>

      <form className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder={t("contact.form.name")}
            className="px-5 py-4 backdrop-blur-xl bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-xl focus:bg-white/70 dark:focus:bg-white/10 focus:border-blue-500 outline-none transition-[background,border] duration-300 text-base shadow-lg text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium"
          />
          <input
            type="email"
            placeholder={t("contact.form.email")}
            className="px-5 py-4 backdrop-blur-xl bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-xl focus:bg-white/70 dark:focus:bg-white/10 focus:border-blue-500 outline-none transition-[background,border] duration-300 text-base shadow-lg text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium"
          />
        </div>
        <textarea
          rows={5}
          placeholder={t("contact.form.message")}
          className="w-full px-5 py-4 backdrop-blur-xl bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-xl focus:bg-white/70 dark:focus:bg-white/10 focus:border-blue-500 outline-none transition-[background,border] duration-300 resize-none text-base shadow-lg text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium"
        />
        <button
          type="submit"
          className="w-full px-8 py-4 backdrop-blur-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-base font-medium hover:shadow-2xl hover:scale-105 transition-[transform,box-shadow] duration-300 border border-white/40"
        >
          {t("contact.form.send")}
        </button>
      </form>

      <div className="content-grid-container">
        <MagicBento
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          disableAnimations={false}
          spotlightRadius={300}
          particleCount={12}
          enableTilt={true}
          glowColor={isDark ? "132, 0, 255" : "59, 130, 246"}
          clickEffect={true}
          enableMagnetism={true}
          cards={[
            {
              color: "transparent",
              title: t("contact.contactInfo.title"),
              description: "khanhvo.kaly@gmail.com",
              label: (
                <Mail
                  size={18}
                  className="text-blue-600 dark:text-blue-400 transition-colors duration-300"
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ContactSection;
