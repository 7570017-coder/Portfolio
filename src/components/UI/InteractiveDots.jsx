import { dotColors } from "../../data/dotsConfig";

const InteractiveDots = ({
  dots,
  handleDotMouseDown,
  isDark,
  mounted,
  isMobile,
}) => {
  // Don't render dots on mobile
  if (isMobile) return null;

  if (!mounted || dots.length === 0) {
    return (
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
    );
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      {dots.map((dot) => {
        const bgColor = isDark
          ? dotColors[dot.color]?.dark
          : dotColors[dot.color]?.light;

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
      })}
    </div>
  );
};

export default InteractiveDots;
