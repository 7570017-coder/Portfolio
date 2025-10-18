const GeometricShapes = () => {
  return (
    <>
      {/* Rotating Circular Ornament - Top Left */}
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

      {/* Rotating Square Ornament - Bottom Right */}
      <div className="absolute bottom-[10%] right-[5%] md:bottom-[15%] md:right-[10%] w-40 h-40 md:w-72 md:h-72 z-5">
        <div className="absolute inset-0 animate-[spin_22s_linear_infinite]">
          <div className="absolute inset-0 border-2 border-dashed border-rose-400/40 dark:border-rose-400/30 rotate-45" />
        </div>
        <div className="absolute inset-[14.6%] animate-[spin_18s_linear_infinite_reverse]">
          <div className="absolute inset-0 border-2 border-dotted border-orange-400/40 dark:border-orange-400/30 rotate-45" />
        </div>
      </div>
    </>
  );
};

export default GeometricShapes;
