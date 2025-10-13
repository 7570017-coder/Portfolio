import MagicBento from "../UI/MagicBento";

function IntroSection({ t, isDark }) {
  return (
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
              description: t("intro.currentWorkCard.description"),
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
                  <div>{t("intro.languagesList.vietnamese")}</div>
                  <div>{t("intro.languagesList.german")}</div>
                  <div>{t("intro.languagesList.russian")}</div>
                  <div>{t("intro.languagesList.ukrainian")}</div>
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
                  <div className="mb-1">{t("intro.education.degree")}</div>
                  <div className="mb-1">{t("intro.education.program")}</div>
                  <div className="mb-1">{t("intro.education.university")}</div>

                  <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-2 py-1 rounded-full w-fit border border-blue-400/30 mt-2 transition-colors duration-300">
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
  );
}

export default IntroSection;
