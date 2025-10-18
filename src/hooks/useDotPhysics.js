import { useState, useEffect, useRef } from "react";
import { initialDots, physicsConfig } from "../data/dotsConfig";

export const useDotPhysics = (mounted, isMobile) => {
  const [dots, setDots] = useState([]);
  const dotsRef = useRef([]);
  const animationFrameRef = useRef(null);

  // Initialize dots
  useEffect(() => {
    if (!mounted || isMobile) return;

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
  }, [mounted, isMobile]);

  // Physics simulation
  useEffect(() => {
    if (!mounted || isMobile) return;

    const {
      gravity,
      friction,
      restitution,
      bounceThreshold,
      groundFriction,
      returnSpeed,
      returnDelay,
    } = physicsConfig;

    const animate = () => {
      const now = Date.now();
      const updated = dotsRef.current.map((dot) => {
        if (dot.isDragging) return dot;
        let newDot = { ...dot };
        const timeSinceMove = now - dot.lastMoveTime;

        if (timeSinceMove > returnDelay && !dot.isReturning) {
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
                newDot.vx += dx * returnSpeed * 0.8;
                newDot.vy += dy * returnSpeed * 0.8;
                newDot.vx *= 0.9;
                newDot.vy *= 0.9;
                break;
              }

              case "spiral": {
                const spiralRadius = distance * 0.95;
                const spiralAngle = angle + 0.15;
                newDot.px = dot.x - Math.cos(spiralAngle) * spiralRadius;
                newDot.py = dot.y - Math.sin(spiralAngle) * spiralRadius;
                break;
              }

              case "bounce": {
                newDot.vx += dx * returnSpeed * 0.6;
                newDot.vy +=
                  dy * returnSpeed * 0.6 + Math.sin(now * 0.02) * 0.1;
                newDot.vx *= 0.92;
                newDot.vy *= 0.92;
                break;
              }

              case "float": {
                newDot.vx += dx * returnSpeed * 0.4;
                newDot.vy += dy * returnSpeed * 0.4;
                newDot.py += Math.sin(now * 0.01 + dot.id) * 0.2;
                newDot.vx *= 0.96;
                newDot.vy *= 0.96;
                break;
              }

              case "pulse": {
                const pulseForce =
                  (Math.sin(now * 0.015 + dot.id) + 1) * 0.01 + returnSpeed;
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
  }, [mounted, isMobile]);

  const handleDotMouseDown = (e, dotId) => {
    // Disable interaction on mobile
    if (isMobile) return;

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

  return { dots, handleDotMouseDown };
};
