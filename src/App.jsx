import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from "@react-spring/web";
import {
  Sun,
  Moon,
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Send,
  ChevronDown,
  Globe,
  Menu,
  X,
} from "lucide-react";
import MagicBento from "./MagicBento";

// Add translations object at the top of the file
const translations = {
  en: {
    nav: {
      intro: "Intro",
      work: "Work",
      contact: "Contact",
    },
    left: {
      name: "Khanh Vo",
      role: "Frontend Developer",
      currentWork: "Currently working at",
      stats: {
        projects: "Projects",
        years: "Years",
        clients: "Clients",
      },
      buttons: {
        viewWork: "View Work",
        contact: "Contact",
      },
    },
    intro: {
      title: "About Me",
      description:
        "I'm a frontend developer passionate about building beautiful, functional web applications. With over 3 years of experience, I've helped startups and enterprises bring their ideas to life.",
      currentWorkCard: {
        title: "Currently Working At",
        description:
          "Orbit Technology. - Intern Frontend Developer, soon to be Fulltime",
      },
      skills: {
        frontend: "Frontend",
        design: "Design",
        languages: "Languages",
        education: "Education",
      },
      education: {
        duration: "2021 - 2025",
        degree: "Bachelor's Degree in Information Technologies",
        program: "Programme: Cyber Security",
        university: "National Aviation University, Kiev",
        graduating: "Graduated | 2025",
      },
      languagesList: {
        english: "English - Fluent",
        vietnamese: "Vietnamese - Native",
        german: "German - Intermediate",
        russian: "Russian - Basic",
        ukrainian: "Ukrainian - Basic",
      },
    },
    work: {
      title: "Selected Work",
    },
    contact: {
      title: "Let's Connect",
      description:
        "Have a project in mind? I'm always open to discussing new opportunities and creative ideas.",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Tell me about your project...",
        send: "Send Message",
      },
      contactInfo: {
        title: "Contact Info",
      },
    },
  },
  de: {
    nav: {
      intro: "Intro",
      work: "Arbeit",
      contact: "Kontakt",
    },
    left: {
      name: "Khanh Vo",
      role: "Frontend Entwickler",
      currentWork: "Derzeit tätig bei",
      stats: {
        projects: "Projekte",
        years: "Jahre",
        clients: "Kunden",
      },
      buttons: {
        viewWork: "Arbeit Ansehen",
        contact: "Kontakt",
      },
    },
    intro: {
      title: "Über Mich",
      description:
        "Ich bin ein Frontend-Entwickler, der leidenschaftlich gerne schöne, funktionale Webanwendungen erstellt. Mit über 3 Jahren Erfahrung habe ich Startups und Unternehmen dabei geholfen, ihre Ideen zu verwirklichen.",
      currentWorkCard: {
        title: "Derzeit Tätig Bei",
        description:
          "Orbit Technology. - Praktikant Frontend Entwickler, bald Vollzeit",
      },
      skills: {
        frontend: "Frontend",
        design: "Design",
        languages: "Sprachen",
        education: "Bildung",
      },
      education: {
        duration: "2021 - 2025",
        degree: "Bachelor-Abschluss in Informationstechnologie",
        program: "Studiengang: Cyber-Sicherheit",
        university: "Nationale Luftfahrt-Universität, Kiew",
        graduating: "Abschluss | 2025",
      },
      languagesList: {
        english: "Englisch - Fließend",
        vietnamese: "Vietnamesisch - Muttersprache",
        german: "Deutsch - Mittelstufe",
        russian: "Russisch - Grundkenntnisse",
        ukrainian: "Ukrainisch - Grundkenntnisse",
      },
    },
    work: {
      title: "Ausgewählte Arbeiten",
    },
    contact: {
      title: "Kontakt Aufnehmen",
      description:
        "Haben Sie ein Projekt im Sinn? Ich bin immer offen für neue Möglichkeiten und kreative Ideen.",
      form: {
        name: "Ihr Name",
        email: "Ihre E-Mail",
        message: "Erzählen Sie mir von Ihrem Projekt...",
        send: "Nachricht Senden",
      },
      contactInfo: {
        title: "Kontaktinformation",
      },
    },
  },
  ru: {
    nav: {
      intro: "Обо мне",
      work: "Работы",
      contact: "Контакты",
    },
    left: {
      name: "Кхань Во",
      role: "Frontend Разработчик",
      currentWork: "В настоящее время работаю в",
      stats: {
        projects: "Проекты",
        years: "Годы",
        clients: "Клиенты",
      },
      buttons: {
        viewWork: "Смотреть Работы",
        contact: "Контакты",
      },
    },
    intro: {
      title: "Обо Мне",
      description:
        "Я frontend-разработчик, увлеченный созданием красивых и функциональных веб-приложений. Имея более 3 лет опыта, я помог стартапам и предприятиям воплотить их идеи в жизнь.",
      currentWorkCard: {
        title: "В Настоящее Время Работаю В",
        description:
          "Orbit Technology. - Стажер Frontend Разработчик, скоро на полную ставку",
      },
      skills: {
        frontend: "Frontend",
        design: "Дизайн",
        languages: "Языки",
        education: "Образование",
      },
      education: {
        duration: "2021 - 2025",
        degree: "Бакалавр информационных технологий",
        program: "Программа: Кибербезопасность",
        university: "Национальный авиационный университет, Киев",
        graduating: "Выпуск | 2025",
      },
      languagesList: {
        english: "Английский - Свободно",
        vietnamese: "Вьетнамский - Родной",
        german: "Немецкий - Средний",
        russian: "Русский - Базовый",
        ukrainian: "Украинский - Базовый",
      },
    },
    work: {
      title: "Избранные Работы",
    },
    contact: {
      title: "Связаться",
      description:
        "Есть проект? Я всегда открыт для обсуждения новых возможностей и творческих идей.",
      form: {
        name: "Ваше Имя",
        email: "Ваш Email",
        message: "Расскажите о вашем проекте...",
        send: "Отправить Сообщение",
      },
      contactInfo: {
        title: "Контактная Информация",
      },
    },
  },
  uk: {
    nav: {
      intro: "Про мене",
      work: "Роботи",
      contact: "Контакти",
    },
    left: {
      name: "Кхань Во",
      role: "Frontend Розробник",
      currentWork: "Наразі працюю в",
      stats: {
        projects: "Проекти",
        years: "Роки",
        clients: "Клієнти",
      },
      buttons: {
        viewWork: "Переглянути Роботи",
        contact: "Контакти",
      },
    },
    intro: {
      title: "Про Мене",
      description:
        "Я frontend-розробник, який з захопленням створює красиві та функціональні веб-додатки. Маючи понад 3 роки досвіду, я допоміг стартапам та підприємствам втілити їхні ідеї в життя.",
      currentWorkCard: {
        title: "Наразі Працюю В",
        description:
          "Orbit Technology. - Стажер Frontend Розробник, скоро на повну ставку",
      },
      skills: {
        frontend: "Frontend",
        design: "Дизайн",
        languages: "Мови",
        education: "Освіта",
      },
      education: {
        duration: "2021 - 2025",
        degree: "Бакалавр з інформаційних технологій",
        program: "Програма: Кібербезпека",
        university: "Національний авіаційний університет, Київ",
        graduating: "Випускник | 2025",
      },
      languagesList: {
        english: "Англійська - Вільно",
        vietnamese: "В'єтнамська - Рідна",
        german: "Німецька - Середній",
        russian: "Російська - Базовий",
        ukrainian: "Українська - Базовий",
      },
    },
    work: {
      title: "Вибрані Роботи",
    },
    contact: {
      title: "Зв'язатися",
      description:
        "Є проект? Я завжди відкритий для обговорення нових можливостей та творчих ідей.",
      form: {
        name: "Ваше Ім'я",
        email: "Ваш Email",
        message: "Розкажіть про ваш проект...",
        send: "Надіслати Повідомлення",
      },
      contactInfo: {
        title: "Контактна Інформація",
      },
    },
  },
  vi: {
    nav: {
      intro: "Giới thiệu",
      work: "Dự án",
      contact: "Liên hệ",
    },
    left: {
      name: "Khánh Võ",
      role: "Frontend Developer",
      currentWork: "Hiện đang làm việc tại",
      stats: {
        projects: "Dự án",
        years: "Năm",
        clients: "Khách hàng",
      },
      buttons: {
        viewWork: "Xem Dự Án",
        contact: "Liên hệ",
      },
    },
    intro: {
      title: "Về Tôi",
      description:
        "Tôi là một lập trình viên frontend đam mê xây dựng các ứng dụng web đẹp mắt và chức năng. Với hơn 3 năm kinh nghiệm, tôi đã giúp các startup và doanh nghiệp hiện thực hóa ý tưởng của họ.",
      currentWorkCard: {
        title: "Hiện Đang Làm Việc Tại",
        description:
          "Orbit Technology. - Thực tập sinh Frontend, sắp chuyển thành Fulltime",
      },
      skills: {
        frontend: "Frontend",
        design: "Thiết kế",
        languages: "Ngôn ngữ",
        education: "Học vấn",
      },
      education: {
        duration: "2021 - 2025",
        degree: "Cử nhân Công nghệ Thông tin",
        program: "Chương trình: An ninh mạng",
        university: "Đại học Hàng không Quốc gia, Kiev",
        graduating: "Tốt nghiệp | 2025",
      },
      languagesList: {
        english: "Tiếng Anh - Thành thạo",
        vietnamese: "Tiếng Việt - Bản ngữ",
        german: "Tiếng Đức - Trung cấp",
        russian: "Tiếng Nga - Cơ bản",
        ukrainian: "Tiếng Ukraine - Cơ bản",
      },
    },
    work: {
      title: "Dự Án Tiêu Biểu",
    },
    contact: {
      title: "Kết nối",
      description:
        "Có một dự án trong đầu? Tôi luôn sẵn sàng thảo luận về các cơ hội mới và ý tưởng sáng tạo.",
      form: {
        name: "Tên của bạn",
        email: "Email của bạn",
        message: "Hãy kể cho tôi về dự án của bạn...",
        send: "Gửi Tin nhắn",
      },
      contactInfo: {
        title: "Thông tin Liên hệ",
      },
    },
  },
};

// Add language options configuration
const languageOptions = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
];

// Custom hook for detecting clicks outside an element
function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("intro");
  const [mounted, setMounted] = useState(false);
  // Add language state
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for click outside detection
  const languageSelectorRef = useRef(null);
  const mobileLanguageSelectorRef = useRef(null);

  // Close language selector when clicking outside
  useClickOutside(languageSelectorRef, () => {
    setIsLanguageOpen(false);
  });

  // Close mobile language selector when clicking outside
  useClickOutside(mobileLanguageSelectorRef, () => {
    setIsLanguageOpen(false);
  });

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
    setIsMobileMenuOpen(false); // Close mobile menu when section changes
  };

  // Add function to change language
  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      year: "2025",
      tech: "React • Node.js • Stripe",
    },
    {
      title: "AI Content Generator",
      year: "2025",
      tech: "Python • OpenAI • FastAPI",
    },
    {
      title: "TOTC",
      year: "2025",
      tech: "React • Vite • Javascript • TypeScript",
    },
    {
      title: "Autotype-Script",
      year: "2025",
      tech: "Python",
    },
  ];

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

  const currentLang = languageOptions.find(
    (lang) => lang.code === currentLanguage
  );

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-150 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 text-gray-900 dark:text-white transition-colors duration-300">
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

      {/* Desktop Navbar */}
      <header className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto">
        <nav className="backdrop-blur-2xl bg-white/50 dark:bg-black/20 border border-white/40 dark:border-white/10 rounded-full px-2 py-2 shadow-2xl shadow-black/10">
          <div className="flex items-center gap-2">
            {["intro", "work", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => changeSection(section)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
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

            <div className="w-px h-6 bg-gray-300/50 dark:bg-gray-700/50 mx-2" />

            {/* Language Selector - Desktop */}
            <div className="relative" ref={languageSelectorRef}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLanguageOpen(!isLanguageOpen);
                }}
                className="flex items-center gap-2 px-4 py-2.5 backdrop-blur-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 rounded-full transition-all border border-white/40 dark:border-white/20"
              >
                <Globe size={16} />
                <span className="text-sm font-medium">{currentLang.flag}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isLanguageOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 backdrop-blur-2xl bg-white/80 dark:bg-black/60 border border-white/40 dark:border-white/10 rounded-2xl py-2 shadow-2xl shadow-black/20 min-w-[140px] z-50">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={(e) => {
                        e.preventDefault();
                        changeLanguage(lang.code);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-all ${
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

            <a
              href="https://t.me/KhvnhVo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 backdrop-blur-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 rounded-full transition-all border border-white/40 dark:border-white/20 hover:scale-110"
              title="Telegram"
            >
              <Send size={18} className="text-blue-600 dark:text-blue-400" />
            </a>

            <button
              onClick={toggleTheme}
              className="p-2.5 backdrop-blur-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 rounded-full transition-all border border-white/40 dark:border-white/20 hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Nav - Hamburger Menu */}
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
        {/* Main mobile nav bar with hamburger */}
        <nav className="backdrop-blur-2xl bg-white/90 dark:bg-slate-900/95 border border-white/40 dark:border-white/10 rounded-full px-4 py-3 shadow-2xl shadow-black/10">
          <div className="flex items-center justify-between w-full">
            {/* Hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 backdrop-blur-xl bg-white/50 dark:bg-white/10 rounded-full transition-all border border-white/40 dark:border-white/20 hover:scale-110"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Current section indicator */}
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t(`nav.${activeSection}`)}
            </span>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 backdrop-blur-xl bg-white/50 dark:bg-white/10 rounded-full transition-all border border-white/40 dark:border-white/20 hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/40 dark:border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/20 z-50">
              <div className="space-y-3">
                {/* Navigation items */}
                {["intro", "work", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => changeSection(section)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      activeSection === section
                        ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 backdrop-blur-xl shadow-lg"
                        : "hover:bg-white/40 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="font-semibold">{t(`nav.${section}`)}</span>
                  </button>
                ))}

                <div className="border-t border-gray-300/50 dark:border-gray-700/50 my-2" />

                {/* Language Selector */}
                <div className="relative" ref={mobileLanguageSelectorRef}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLanguageOpen(!isLanguageOpen);
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 backdrop-blur-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Globe size={18} />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {currentLang.flag} Language
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isLanguageOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isLanguageOpen && (
                    <div className="mt-2 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/40 dark:border-white/10 rounded-xl py-2 shadow-2xl shadow-black/20 z-50">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={(e) => {
                            e.preventDefault();
                            changeLanguage(lang.code);
                          }}
                          className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-all ${
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

                {/* Telegram link */}
                <a
                  href="https://t.me/KhvnhVo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 backdrop-blur-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 rounded-xl transition-all"
                >
                  <Send
                    size={18}
                    className="text-blue-600 dark:text-blue-400"
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

      {/* Main Content Grid */}
      <main className="h-full flex items-center justify-center px-4 md:px-8 pt-28 md:pt-28 pb-8 overflow-y-auto md:overflow-hidden">
        <div className="max-w-7xl w-full h-full md:h-auto grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center md:items-center">
          {/* Left Column - 2 cols - Centered */}
          <animated.div
            style={leftAnimation}
            className="md:col-span-2 flex items-center justify-center w-full mt-4 md:mt-0"
          >
            <div className="w-full max-w-md backdrop-blur-xl bg-white/60 dark:bg-white/5 border-2 border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-6">
              {/* Avatar and Name */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <img
                    src="/photo_2025-10-10_14-57-31.jpg"
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-2xl border-4 border-gray-600/80 dark:border-gray-400/80 shadow-2xl"
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
                  onClick={() => changeSection("work")}
                  className="flex-1 px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-2xl hover:scale-105 transition-all border border-white/40"
                >
                  {t("left.buttons.viewWork")}
                </button>
                <button
                  onClick={() => changeSection("contact")}
                  className="flex-1 px-6 py-3 backdrop-blur-xl bg-white/50 dark:bg-white/10 border border-white/50 dark:border-white/20 rounded-xl text-sm font-medium hover:bg-white/70 dark:hover:bg-white/20 hover:scale-105 transition-all"
                >
                  {t("left.buttons.contact")}
                </button>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
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
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className="p-3 backdrop-blur-xl bg-white/60 dark:bg-white/10 border border-white/60 dark:border-white/20 rounded-xl hover:bg-white/80 dark:hover:bg-white/20 hover:scale-110 transition-all shadow-lg"
                  >
                    <social.icon size={20} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </animated.div>

          {/* Right Column - 3 cols - Content Area */}
          <div className="md:col-span-3 h-full flex items-center w-full">
            <div className="w-full h-full flex items-center justify-center">
              <animated.div
                style={contentAnimation}
                className="h-full w-full flex flex-col"
              >
                {/* Mobile: Scrollable container */}
                <div className="flex-1 overflow-y-auto md:overflow-visible md:flex md:items-center md:justify-center">
                  {/* Intro Section */}
                  {activeSection === "intro" && (
                    <div className="w-full max-w-4xl space-y-6 px-4 md:px-8 py-4 md:py-0">
                      <h2 className="text-2xl md:text-3xl font-bold text-center">
                        {t("intro.title")}
                      </h2>

                      <p className="text-base md:text-lg text-gray-800 dark:text-gray-300 leading-relaxed font-medium text-center">
                        {t("intro.description")}
                      </p>

                      {/* Current Work Card */}
                      <div className="content-grid-container">
                        <MagicBento
                          textAutoHide={false}
                          enableStars={true}
                          enableSpotlight={true}
                          enableBorderGlow={true}
                          disableAnimations={false}
                          spotlightRadius={300}
                          particleCount={10}
                          enableTilt={true}
                          glowColor={isDark ? "132, 0, 255" : "59, 130, 246"}
                          clickEffect={true}
                          enableMagnetism={true}
                          cards={[
                            {
                              color: "transparent",
                              title: t("intro.currentWorkCard.title"),
                              description: t(
                                "intro.currentWorkCard.description"
                              ),
                            },
                          ]}
                        />
                      </div>

                      {/* Skills Grid */}
                      <div className="content-grid-container">
                        <MagicBento
                          textAutoHide={false}
                          enableStars={true}
                          enableSpotlight={true}
                          enableBorderGlow={true}
                          disableAnimations={false}
                          spotlightRadius={300}
                          particleCount={10}
                          enableTilt={true}
                          glowColor={isDark ? "132, 0, 255" : "59, 130, 246"}
                          clickEffect={true}
                          enableMagnetism={true}
                          cards={[
                            {
                              color: "transparent",
                              title: t("intro.skills.frontend"),
                              description: (
                                <div className="space-y-1 text-sm text-left">
                                  <div>React</div>
                                  <div>TypeScript</div>
                                  <div>JavaScript</div>
                                  <div>Node.js</div>
                                  <div>Tailwind CSS</div>
                                </div>
                              ),
                            },
                            {
                              color: "transparent",
                              title: t("intro.skills.design"),
                              description: (
                                <div className="space-y-1 text-sm text-left">
                                  <div>Figma</div>
                                  <div>UI/UX</div>
                                  <div>Prototyping</div>
                                  <div>Design Systems</div>
                                  <div>Wireframing</div>
                                </div>
                              ),
                            },
                            {
                              color: "transparent",
                              title: t("intro.skills.languages"),
                              description: (
                                <div className="space-y-1 text-sm text-left">
                                  <div>{t("intro.languagesList.english")}</div>
                                  <div>
                                    {t("intro.languagesList.vietnamese")}
                                  </div>
                                  <div>{t("intro.languagesList.german")}</div>
                                  <div>{t("intro.languagesList.russian")}</div>
                                  <div>
                                    {t("intro.languagesList.ukrainian")}
                                  </div>
                                </div>
                              ),
                            },
                            {
                              color: "transparent",
                              title: t("intro.skills.education"),
                              description: (
                                <div className="space-y-1 text-sm text-left w-full">
                                  <div className="font-medium">
                                    {t("intro.education.duration")}
                                  </div>
                                  <div className="mb-1">
                                    {t("intro.education.degree")}
                                  </div>
                                  <div className="mb-1">
                                    {t("intro.education.program")}
                                  </div>
                                  <div className="mb-1">
                                    {t("intro.education.university")}
                                  </div>

                                  <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-2 py-1 rounded-full w-fit border border-blue-400/30 mt-2">
                                    <span className="text-xs">🎓</span>
                                    <span className="font-medium">
                                      {t("intro.education.graduating")}
                                    </span>
                                  </div>
                                </div>
                              ),
                            },
                          ]}
                        />
                      </div>
                    </div>
                  )}

                  {/* Work Section */}
                  {activeSection === "work" && (
                    <div className="space-y-5 md:space-y-6 flex flex-col items-center justify-center px-4 md:px-8 py-4 md:py-0">
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
                        {t("work.title")}
                      </h2>

                      <div className="content-grid-container max-w-3xl w-full">
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
                          cards={projects.map((project) => ({
                            color: "transparent",
                            title: project.title,
                            description: `${project.tech} • ${project.year}`,
                          }))}
                        />
                      </div>
                    </div>
                  )}

                  {/* Contact Section */}
                  {activeSection === "contact" && (
                    <div className="space-y-6 px-4 md:px-8 py-4 md:py-0">
                      <h2 className="text-2xl md:text-3xl font-bold">
                        {t("contact.title")}
                      </h2>

                      <p className="text-base md:text-lg text-gray-800 dark:text-gray-300 mb-6 font-medium">
                        {t("contact.description")}
                      </p>

                      <form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <input
                            type="text"
                            placeholder={t("contact.form.name")}
                            className="px-5 py-4 backdrop-blur-xl bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-xl focus:bg-white/70 dark:focus:bg-white/10 focus:border-blue-500 outline-none transition-all text-base shadow-lg text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium"
                          />
                          <input
                            type="email"
                            placeholder={t("contact.form.email")}
                            className="px-5 py-4 backdrop-blur-xl bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-xl focus:bg-white/70 dark:focus:bg-white/10 focus:border-blue-500 outline-none transition-all text-base shadow-lg text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium"
                          />
                        </div>
                        <textarea
                          rows={5}
                          placeholder={t("contact.form.message")}
                          className="w-full px-5 py-4 backdrop-blur-xl bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-xl focus:bg-white/70 dark:focus:bg-white/10 focus:border-blue-500 outline-none transition-all resize-none text-base shadow-lg text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium"
                        />
                        <button
                          type="submit"
                          className="w-full px-8 py-4 backdrop-blur-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-base font-medium hover:shadow-2xl hover:scale-105 transition-all border border-white/40"
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
                                  className="text-blue-600 dark:text-blue-400"
                                />
                              ),
                            },
                          ]}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </animated.div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Stats grid - smaller size */
        .stats-grid-container-small .bento-section {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 0.75rem !important;
          padding: 0 !important;
          max-width: 100% !important;
          margin: 0 !important;
        }

        .stats-grid-container-small .card-responsive {
          display: contents !important;
        }

        .stats-grid-container-small .card {
          backdrop-filter: blur(20px) !important;
          background: rgba(255, 255, 255, 0.6) !important;
          aspect-ratio: auto !important;
          min-height: auto !important;
          padding: 1rem 0.75rem !important;
          border: 1px solid rgba(255, 255, 255, 0.6) !important;
          margin: 0 !important;
          position: relative;
          z-index: 1;
        }

        .dark .stats-grid-container-small .card {
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
        }

        /* Text colors for all MagicBento cards */
        .stats-grid-container-small .card .card__content,
        .content-grid-container .card .card__content {
          color: rgb(17, 24, 39) !important;
        }

        .dark .stats-grid-container-small .card .card__content,
        .dark .content-grid-container .card .card__content {
          color: rgb(255, 255, 255) !important;
        }

        .stats-grid-container-small .card .card__description,
        .content-grid-container .card .card__description {
          color: rgb(55, 65, 81) !important;
          opacity: 0.9 !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
        }

        .dark .stats-grid-container-small .card .card__description,
        .dark .content-grid-container .card .card__description {
          color: rgb(229, 231, 235) !important;
          opacity: 0.9 !important;
        }

        .content-grid-container .bento-section {
          padding: 0 !important;
          max-width: 100% !important;
          overflow: visible !important;
          margin: 0 !important;
        }

        /* Full width single card */
        .content-grid-container .bento-section:has(.card-responsive:only-child) .card-responsive {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 1rem !important;
          padding: 0 !important;
          width: 100% !important;
          margin: 0 !important;
        }

        /* Two cards in same row (Education & Languages) */
        .content-grid-container .bento-section:has(.card-responsive > :nth-child(2)) .card-responsive {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 1rem !important;
          padding: 0 !important;
          width: 100% !important;
          margin: 0 !important;
        }

        @media (min-width: 768px) {
          .content-grid-container .bento-section:has(.card-responsive > :nth-child(2)) .card-responsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Four cards grid (Skills) */
        .content-grid-container .bento-section:has(.card-responsive > :nth-child(4)) .card-responsive {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 1rem !important;
          padding: 0 !important;
          width: 100% !important;
          margin: 0 !important;
        }

        @media (min-width: 768px) {
          .content-grid-container .bento-section:has(.card-responsive > :nth-child(4)) .card-responsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        .content-grid-container .card {
          backdrop-filter: blur(20px) !important;
          background: rgba(255, 255, 255, 0.6) !important;
          aspect-ratio: auto !important;
          min-height: auto !important;
          grid-column: auto !important;
          grid-row: auto!important;
          border: 1px solid rgba(255, 255, 255, 0.6) !important;
          margin: 0 !important;
          position: relative;
          z-index: 1;
        }

        .dark .content-grid-container .card {
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
        }

        /* Card content alignment */
        .card__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start !important;
          text-align: left !important;
          justify-content: flex-start !important;
          height: 100% !important;
        }

        /* Consistent text styling for cards */
        .card__title {
          font-weight: 600 !important;
          font-size: 1.1rem !important;
          margin-bottom: 0.75rem !important;
          line-height: 1.4 !important;
          text-align: left !important;
        }

        .card__description {
          font-weight: 500 !important;
          line-height: 1.5 !important;
          font-size: 0.95rem !important;
          opacity: 0.9 !important;
          text-align: left !important;
          justify-content: flex-start !important;
        }

        /* Hover effects with proper spacing to prevent clipping */
        .stats-grid-container-small .card,
        .content-grid-container .card {
          transition: all 0.3s ease !important;
          transform-origin: center;
        }

        .stats-grid-container-small .card:hover,
        .content-grid-container .card:hover {
          border-color: rgba(59, 130, 246, 0.8) !important;
          box-shadow: 0 12px 30px rgba(0,0,0,0.15), 0 0 30px rgba(59, 130, 246, 0.4) !important;
          transform: translateY(-2px) scale(1.02) !important;
          z-index: 10 !important;
        }

        .dark .stats-grid-container-small .card:hover,
        .dark .content-grid-container .card:hover {
          border-color: rgba(139, 92, 246, 0.8) !important;
          box-shadow: 0 12px 30px rgba(0,0,0,0.25), 0 0 30px rgba(139, 92, 246, 0.4) !important;
        }

        /* Add proper spacing to prevent hover clipping */
        .stats-grid-container-small,
        .content-grid-container {
          overflow: visible;
        }

        .bento-section {
          overflow: visible !important;
          position: relative;
        }

        .card {
          overflow: visible !important;
          border-radius: 16px !important;
          transition: all 0.3s ease !important;
        }

        .card--border-glow::after {
          border-radius: 16px !important;
        }

        /* Avatar border improvements */
        .relative.w-20.h-20 img {
          border-radius: 16px !important;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 767px) {
          .stats-grid-container-small .bento-section {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.5rem !important;
          }
          
          .stats-grid-container-small .card {
            padding: 0.75rem 0.5rem !important;
          }
          
          .content-grid-container .bento-section:has(.card-responsive > :nth-child(2)) .card-responsive,
          .content-grid-container .bento-section:has(.card-responsive > :nth-child(4)) .card-responsive {
            grid-template-columns: 1fr !important;
          }
        }

        /* Desktop scrolling for columns - REMOVED */
        @media (min-width: 768px) {
          .md\\:col-span-3 {
            height: 100%;
          }
          
          main {
            overflow-y: hidden !important;
          }
        }

        /* Main container for mobile - ENABLE scroll */
        @media (max-width: 767px) {
          main {
            height: 100vh !important;
            overflow-y: auto !important;
            align-items: flex-start !important;
          }
          
          main > div {
            height: auto !important;
            min-height: 100% !important;
          }
        }

        /* Fix for consistent flag display across devices */
        .flag-emoji {
          font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", "EmojiSymbols", "EmojiOne Mozilla", "Twemoji Mozilla", "Segoe UI Symbol", sans-serif;
          font-size: 1.2em;
          line-height: 1;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

export default App;
