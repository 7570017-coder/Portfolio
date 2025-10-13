import MagicBento from "../UI/MagicBento";
import { projects } from "../../data/projects";

function WorkSection({ t, isDark }) {
  return (
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
  );
}

export default WorkSection;
