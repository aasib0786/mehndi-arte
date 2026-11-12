import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { beforeAfterSets, BeforeAfterSet } from '@/data/gallery';
import { EditorialImage } from '@/components/common/EditorialImage';
import { MandalaMotif, LotusFloretMotif } from '@/components/motifs';

interface BeforeAfterSliderProps {
  className?: string;
  defaultCategory?: 'mehndi' | 'makeup' | 'hair';
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  className = '',
  defaultCategory = 'mehndi',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'mehndi' | 'makeup' | 'hair'>(defaultCategory);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSet: BeforeAfterSet =
    beforeAfterSets.find((s) => s.id === selectedCategory) || beforeAfterSets[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  // Handle direct click/tap on the slider to snap
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onMouseUp = () => setIsDragging(false);
    const onTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Three-Way Service Comparison Switcher */}
      <div className="flex justify-center overflow-x-auto max-w-full pb-1">
        <div className="inline-flex p-1 bg-ivory-warm border border-gold/40 shadow-sm gap-1 sm:gap-2">
          {beforeAfterSets.map((set) => {
            const isActive = selectedCategory === set.id;

            return (
              <button
                key={set.id}
                onClick={() => {
                  setSelectedCategory(set.id);
                  setSliderPosition(50); // Reset position on toggle
                }}
                className={`relative px-2.5 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] font-medium transition-colors duration-300 whitespace-nowrap ${
                  isActive ? 'text-ivory' : 'text-charcoal-muted hover:text-henna'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="beforeAfterActiveToggle"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 bg-henna border border-gold shadow-fine"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {set.id === 'mehndi' && <span>🌿</span>}
                  {set.id === 'makeup' && <span>💄</span>}
                  {set.id === 'hair' && <span>✂️</span>}
                  <span>{set.tabLabel}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Drag Comparison Canvas */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden select-none cursor-ew-resize border-2 border-gold/40 shadow-editorial bg-ivory ornate-corners"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSet.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Layer 1: After / Matured (Underneath, Full Width) */}
            <div className="absolute inset-0 w-full h-full">
              <EditorialImage
                src={currentSet.maturedImage}
                alt={`${currentSet.title} - ${currentSet.maturedLabel}`}
                fallbackTitle={currentSet.maturedLabel}
                fallbackSubtitle={currentSet.purityBadge}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Layer 2: Before / Fresh (Clipped dynamically from Right) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <EditorialImage
                src={currentSet.freshImage}
                alt={`${currentSet.title} - ${currentSet.freshLabel}`}
                fallbackTitle={currentSet.freshLabel}
                fallbackSubtitle={currentSet.subtitle}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-ivory/95 backdrop-blur-md text-henna text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium border border-gold/50 shadow-fine">
            {currentSet.freshLabel}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-henna/95 backdrop-blur-md text-ivory text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium border border-gold shadow-gold">
            {currentSet.maturedLabel}
          </span>
        </div>

        {/* Drag Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-[2px] h-full bg-gold shadow-[0_0_12px_rgba(184,137,58,0.7)]" />

          {/* Central Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-henna border-2 border-gold flex items-center justify-center text-ivory shadow-gold transition-transform duration-150 hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="#B8893A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 3 12 9 6" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="#B8893A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rotate-180 -ml-1.5"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 3 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Drag Instruction Cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <span className="px-3 py-1 bg-charcoal/85 text-ivory text-[10px] uppercase tracking-widest backdrop-blur-md border border-gold/40 shadow-sm flex items-center gap-1.5">
            <span>↔</span>
            <span>Drag Handle To Reveal Transformation</span>
            <span>↔</span>
          </span>
        </div>
      </div>

      {/* Explanatory Transformation Details Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSet.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="editorial-card p-6 sm:p-8 bg-ivory paper-grain ornate-corners border border-gold/30 space-y-4 max-w-3xl mx-auto shadow-fine"
        >
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold-dark font-medium">
              <LotusFloretMotif size={18} />
              <span>{currentSet.oxidationTime}</span>
              <LotusFloretMotif size={18} />
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-henna font-medium">
              {currentSet.title}
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
              {currentSet.subtitle}
            </p>
          </div>

          <div className="gold-divider" />

          {/* Before vs After Dual Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-1 text-xs">
            <div className="p-4 bg-ivory-warm/60 border border-gold/20 space-y-1">
              <div className="flex items-center justify-between text-henna font-medium uppercase tracking-wider text-[11px]">
                <span>← {currentSet.freshLabel}</span>
                <span className="text-[10px] text-charcoal-soft font-mono">01</span>
              </div>
              <p className="text-charcoal-muted font-light leading-relaxed">
                {currentSet.freshDescription}
              </p>
            </div>

            <div className="p-4 bg-henna/5 border border-gold/40 space-y-1">
              <div className="flex items-center justify-between text-gold-dark font-medium uppercase tracking-wider text-[11px]">
                <span>{currentSet.maturedLabel} →</span>
                <span className="text-[10px] text-henna font-mono">02</span>
              </div>
              <p className="text-charcoal-muted font-light leading-relaxed">
                {currentSet.maturedDescription}
              </p>
            </div>
          </div>

          {/* Quality & Certification Badge */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-charcoal-soft uppercase tracking-wider font-light text-center">
            <MandalaMotif size={14} className="text-gold" />
            <span>{currentSet.purityBadge}</span>
            <MandalaMotif size={14} className="text-gold" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
