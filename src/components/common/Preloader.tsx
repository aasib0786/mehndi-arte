import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brandConfig } from '@/lib/config';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { MehndiConeMotif, MakeupBrushMotif } from '@/components/motifs';

interface PreloaderProps {
  onComplete?: () => void;
}

const STORAGE_KEY = 'kashish_studio_preloader_seen';

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    return !seen;
  });

  // Animation timeline stages:
  // 1: Mehndi cone draws mandala (0 - 800ms)
  // 2: Makeup brush stroke sweeps across (800ms - 1350ms)
  // 3: Brand name letter-by-letter reveal (1350ms - 2000ms)
  // 4: Exit wipe (2000ms - 2400ms)
  const [stage, setStage] = useState<number>(1);

  useEffect(() => {
    // If user prefers reduced motion or already seen in this session, skip immediately
    if (prefersReducedMotion || !isVisible) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      }
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Step 2: Brush sweep starts at 800ms
    const timer1 = setTimeout(() => {
      setStage(2);
    }, 800);

    // Step 3: Brand name letters reveal at 1350ms
    const timer2 = setTimeout(() => {
      setStage(3);
    }, 1350);

    // Step 4: Begin exit at 2000ms
    const timer3 = setTimeout(() => {
      setStage(4);
    }, 2000);

    // Final completion: total runtime ~2.4s (strictly under 2.5s)
    const timer4 = setTimeout(() => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      }
      setIsVisible(false);
      onComplete?.();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isVisible, prefersReducedMotion, onComplete]);

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }
    setIsVisible(false);
    onComplete?.();
  };

  if (!isVisible) return null;

  const brandLetters = brandConfig.brandName.toUpperCase().split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0.9,
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory paper-grain text-charcoal select-none overflow-hidden"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Subtle gold double framing border */}
          <div className="absolute inset-4 sm:inset-8 border border-gold/30 pointer-events-none" />
          <div className="absolute inset-6 sm:inset-10 border border-gold/15 pointer-events-none" />

          {/* Skip CTA */}
          <button
            onClick={handleSkip}
            className="absolute top-8 right-8 z-10 text-[10px] uppercase tracking-[0.22em] text-charcoal-soft hover:text-henna transition-colors py-2 px-3 border border-gold/20 hover:border-gold"
            aria-label="Skip intro animation"
          >
            Skip Intro ↗
          </button>

          <div className="relative flex flex-col items-center justify-center max-w-lg mx-auto px-6 text-center">
            {/* SVG Visual Stage: Mandala + Cone + Makeup Brush */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-6">
              {/* 1. Handcrafted Mandala Canvas */}
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
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                />

                {/* Inner Dotted Ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="13"
                  stroke="#5A1E1B"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: 'easeInOut' }}
                />

                {/* 8 Sacred Petals */}
                <motion.path
                  d="M50 34 C53 40 57 40 57 45 C57 50 50 50 50 50 C50 50 43 50 43 45 C43 40 47 40 50 34 Z M50 66 C53 60 57 60 57 55 C57 50 50 50 50 50 C50 50 43 50 43 55 C43 60 47 60 50 66 Z M34 50 C40 53 40 57 45 57 C50 57 50 50 50 50 C50 50 50 43 45 43 C40 43 40 47 34 50 Z M66 50 C60 53 60 57 55 57 C50 57 50 50 50 50 C50 50 50 43 55 43 C60 43 60 47 66 50 Z"
                  stroke="#B8893A"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: 'easeInOut' }}
                />

                {/* Outer Scallop Contour */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="27"
                  stroke="#B8893A"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
                />

                <motion.path
                  d="M50 18 C56 18 64 22 68 28 C74 34 78 42 78 50 C78 58 74 66 68 72 C62 78 54 82 50 82 C44 82 36 78 30 72 C24 66 22 58 22 50 C22 42 26 34 32 28 C38 22 44 18 50 18 Z"
                  stroke="#5A1E1B"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.4, ease: 'easeInOut' }}
                />

                {/* Sweeping Soft Rose / Gold Makeup Brush Stroke Arc */}
                <motion.path
                  d="M 18 72 C 32 68, 50 36, 82 24"
                  stroke="url(#brushStrokeGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    stage >= 2
                      ? { pathLength: 1, opacity: 0.85 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                />

                {/* Secondary Blush Glow Stroke */}
                <motion.path
                  d="M 22 76 C 36 72, 54 40, 84 28"
                  stroke="#C9A193"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="4 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    stage >= 2
                      ? { pathLength: 1, opacity: 0.7 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
                />

                <defs>
                  <linearGradient id="brushStrokeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9A193" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#E8CFC6" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#B8893A" stopOpacity="0.95" />
                  </linearGradient>
                </defs>
              </svg>

              {/* 2. Mehndi Cone Tracing the Mandala (Stage 1) */}
              <motion.div
                className="absolute pointer-events-none"
                initial={{ x: 30, y: -25, rotate: -15, opacity: 0 }}
                animate={
                  stage === 1
                    ? {
                        x: [30, 8, -20, 10, 24],
                        y: [-25, -15, 6, 22, -6],
                        rotate: [-15, -8, 6, -12, -20],
                        opacity: [0, 1, 1, 1, 0.4],
                      }
                    : { opacity: 0, scale: 0.8, y: -40 }
                }
                transition={{ duration: 0.85, ease: 'easeInOut' }}
                style={{ width: 40, height: 40 }}
              >
                <MehndiConeMotif size={40} className="text-henna" />
              </motion.div>

              {/* 3. Makeup Brush Sweeping Across (Stage 2) */}
              <motion.div
                className="absolute pointer-events-none z-20"
                initial={{ x: -45, y: 35, rotate: 35, opacity: 0 }}
                animate={
                  stage === 2
                    ? {
                        x: [-45, 0, 48],
                        y: [35, -5, -42],
                        rotate: [35, 20, 5],
                        opacity: [0, 1, 0.9],
                      }
                    : stage > 2
                    ? { opacity: 0, x: 60, y: -50 }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                style={{ width: 44, height: 44 }}
              >
                <MakeupBrushMotif size={44} className="text-gold-dark filter drop-shadow-sm" />
              </motion.div>
            </div>

            {/* Brand Name: Letter-by-Letter Reveal (Stage 3) */}
            <div className="overflow-hidden py-1">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-henna tracking-[0.24em] font-medium flex items-center justify-center flex-wrap">
                {brandLetters.map((letter, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={
                      stage >= 3
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 16 }
                    }
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.025,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className={letter === ' ' ? 'mx-1 sm:mx-1.5' : ''}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Subtitle Accent */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="font-vibes text-xl sm:text-2xl text-gold-dark mt-2 tracking-wide"
            >
              Mehndi &bull; Makeup &bull; Parlour Studio
            </motion.p>

            {/* Fine loading gold hairline */}
            <div className="w-36 h-[1.5px] bg-gold/25 mt-6 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-henna via-gold to-blush"
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
