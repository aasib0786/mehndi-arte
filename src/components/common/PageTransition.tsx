import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { PaisleyMotif } from '@/components/motifs';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <>
      {/* Entering Maroon Curtain (Slides up off-screen) */}
      <motion.div
        className="fixed inset-0 z-50 bg-henna flex items-center justify-center pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: 'top' }}
      >
        <div className="text-gold/40">
          <PaisleyMotif size={64} />
        </div>
      </motion.div>

      {/* Exiting Maroon Curtain (Slides up from bottom to cover screen) */}
      <motion.div
        className="fixed inset-0 z-50 bg-henna flex items-center justify-center pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: 'bottom' }}
      >
        <div className="text-gold/40">
          <PaisleyMotif size={64} />
        </div>
      </motion.div>

      {/* Main Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
};

