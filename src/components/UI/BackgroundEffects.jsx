const BackgroundEffects = () => {
  return (
    <>
      {/* Large Gradient Orbs */}
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

      {/* Animated Waves */}
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

      {/* Grid and Radial Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(167,139,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(167,139,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.12),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
    </>
  );
};

export default BackgroundEffects;
