import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brandConfig } from '@/lib/config';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface PreloaderProps {
  onComplete?: () => void;
}

const STORAGE_KEY = 'kashish_mehndi_preloader_seen';

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    // Check session storage
    const seen = sessionStorage.getItem(STORAGE_KEY);
    return !seen;
  });

  const [step, setStep] = useState<number>(1); // 1: Drawing mandala, 2: Letters reveal, 3: Exit

  useEffect(() => {
    // If reduced motion or already seen, skip immediately
    if (prefersReducedMotion || !isVisible) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      }
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Phase 1 -> Phase 2: Mandala drawn, reveal letters at 900ms
    const timer1 = setTimeout(() => {
      setStep(2);
    }, 900);

    // Phase 2 -> Phase 3: Start exit transition at 1900ms
    const timer2 = setTimeout(() => {
      setStep(3);
    }, 1900);

    // Complete by 2400ms (max 2.5s requirement)
    const timer3 = setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setIsVisible(false);
      onComplete?.();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isVisible, prefersReducedMotion, onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
    onComplete?.();
  };

  if (!isVisible) return null;

  const brandLetters = brandConfig.brandName.toUpperCase().split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory paper-grain text-charcoal select-none overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {/* Subtle gold framing border */}
          <div className="absolute inset-4 sm:inset-8 border border-gold/25 pointer-events-none" />

          {/* Skip CTA */}
          <button
            onClick={handleSkip}
            className="absolute top-8 right-8 z-10 text-[11px] uppercase tracking-[0.2em] text-charcoal-soft hover:text-henna transition-colors py-2 px-3"
            aria-label="Skip intro animation"
          >
            Skip Intro
          </button>

          <div className="relative flex flex-col items-center justify-center max-w-lg mx-auto px-6 text-center">
            {/* SVG Illustration Container */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-8">
              {/* Animating Mandala SVG */}
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-gold"
              >
                {/* Center Core */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="6"
                  stroke="#B8893A"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />

                {/* Inner Ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="14"
                  stroke="#5A1E1B"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
                />

                {/* 8 Lotus Petals */}
                <motion.path
                  d="M50 34 C53 40 57 40 57 45 C57 50 50 50 50 50 C50 50 43 50 43 45 C43 40 47 40 50 34 Z M50 66 C53 60 57 60 57 55 C57 50 50 50 50 50 C50 50 43 50 43 55 C43 60 47 60 50 66 Z M34 50 C40 53 40 57 45 57 C50 57 50 50 50 50 C50 50 50 43 45 43 C40 43 40 47 34 50 Z M66 50 C60 53 60 57 55 57 C50 57 50 50 50 50 C50 50 50 43 55 43 C60 43 60 47 66 50 Z"
                  stroke="#B8893A"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: 'easeInOut' }}
                />

                {/* Outer Ring & Petal Scallops */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="28"
                  stroke="#B8893A"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.35, ease: 'easeInOut' }}
                />

                <motion.path
                  d="M50 18 C56 18 64 22 68 28 C74 34 78 42 78 50 C78 58 74 66 68 72 C62 78 54 82 50 82 C44 82 36 78 30 72 C24 66 22 58 22 50 C22 42 26 34 32 28 C38 22 44 18 50 18 Z"
                  stroke="#5A1E1B"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.45, ease: 'easeInOut' }}
                />
              </svg>

              {/* Drawing Mehndi Cone */}
              <motion.div
                className="absolute pointer-events-none"
                initial={{
                  x: 35,
                  y: -35,
                  rotate: -20,
                  opacity: 0,
                }}
                animate={
                  step < 3
                    ? {
                        x: [35, 10, -25, 15, 30],
                        y: [-35, -20, 10, 30, -10],
                        rotate: [-20, -10, 5, -15, -25],
                        opacity: [0, 1, 1, 1, 0.4],
                      }
                    : { opacity: 0, y: -50 }
                }
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                style={{ width: 44, height: 44 }}
              >
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-henna drop-shadow-sm">
                  <path
                    d="M28 20 L78 28 L36 86 Z"
                    stroke="#5A1E1B"
                    strokeWidth="2.5"
                    fill="#5A1E1B"
                    fillOpacity="0.12"
                  />
                  <path d="M36 86 L34 96" stroke="#B8893A" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="34" cy="98" r="2" fill="#B8893A" />
                </svg>
              </motion.div>
            </div>

            {/* Brand Name: Letter by Letter Reveal */}
            <div className="overflow-hidden py-1">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-henna tracking-[0.22em] font-medium flex items-center justify-center flex-wrap">
                {brandLetters.map((letter, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 18 }}
                    animate={
                      step >= 2
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 18 }
                    }
                    transition={{
                      duration: 0.35,
                      delay: idx * 0.035,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className={letter === ' ' ? 'mx-1.5' : ''}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Subtitle Accent */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={step >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="font-vibes text-xl sm:text-2xl text-gold-dark mt-2 tracking-wide"
            >
              Bespoke Bridal Henna Couture
            </motion.p>

            {/* Fine loading hairline */}
            <div className="w-32 h-[1px] bg-gold/30 mt-6 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
