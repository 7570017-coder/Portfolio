// Initial dot positions and configurations
export const initialDots = [
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

export const dotColors = {
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

export const physicsConfig = {
  gravity: 0.08,
  friction: 0.99,
  restitution: 0.8,
  bounceThreshold: 0.3,
  groundFriction: 1,
  returnSpeed: 0.05,
  returnDelay: 8000,
};
