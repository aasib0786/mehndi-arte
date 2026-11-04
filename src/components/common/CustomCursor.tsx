import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // Mouse coordinates (target)
  const mousePos = useRef({ x: -100, y: -100 });
  // Ring coordinates (smoothed with lerp)
  const ringPos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if pointer is coarse (touch device) or if reduced motion is requested
    const checkIsTouch = () => {
      const hasTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(hasTouch);
    };

    checkIsTouch();
    window.addEventListener('resize', checkIsTouch);

    if (isTouchDevice || prefersReducedMotion) {
      document.body.classList.remove('custom-cursor-enabled');
      return () => {
        window.removeEventListener('resize', checkIsTouch);
      };
    }

    document.body.classList.add('custom-cursor-enabled');

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Interactive element hover detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], img, [data-cursor-hover], .cursor-pointer'
      );
      if (interactive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Animation loop for smooth ring lag (lerp)
    const animate = () => {
      const ease = 0.16; // Lerp smoothing factor
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('resize', checkIsTouch);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isTouchDevice, isVisible, prefersReducedMotion]);

  // Don't render custom cursor on touch devices or reduced motion
  if (isTouchDevice || prefersReducedMotion) {
    return null;
  }

  return (
    <>
      {/* Small Gold Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-gold transition-transform duration-150 ${
            isClicked ? 'scale-150 bg-henna' : isHovered ? 'scale-0' : 'scale-100'
          }`}
        />
      </div>

      {/* Trailing Gold Expanding Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full border border-gold/70 transition-all duration-300 ease-out flex items-center justify-center ${
            isHovered
              ? 'w-14 h-14 bg-gold/15 border-gold scale-100 shadow-[0_0_15px_rgba(184,137,58,0.25)]'
              : isClicked
              ? 'w-8 h-8 bg-henna/15 border-henna scale-90'
              : 'w-9 h-9 bg-transparent border-gold/60 scale-100'
          }`}
        >
          {isHovered && (
            <span className="w-1 h-1 rounded-full bg-gold animate-ping opacity-60" />
          )}
        </div>
      </div>
    </>
  );
};
