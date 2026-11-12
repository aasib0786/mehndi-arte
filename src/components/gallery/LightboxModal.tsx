import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '@/data/gallery';
import { useBooking } from '@/context/BookingContext';
import { EditorialImage } from '@/components/common/EditorialImage';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const { selectAndScrollToBooking } = useBooking();
  const touchStartX = useRef<number>(0);

  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prev = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(prev);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const next = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(next);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation (Arrow keys + Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 50) {
      handleNext(); // Swiped left -> show next
    } else if (deltaX < -50) {
      handlePrev(); // Swiped right -> show prev
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-8 select-none overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Photo Lightbox"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between z-20 border-b border-gold/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium px-2.5 py-1 bg-gold/10 border border-gold/30">
              {currentItem.categoryLabel}
            </span>
            <span className="text-xs text-ivory/60 font-sans tracking-widest">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-ivory/70 hover:text-gold transition-colors focus:outline-none flex items-center gap-2 group"
            aria-label="Close Lightbox (Esc)"
          >
            <span className="text-[11px] uppercase tracking-widest hidden sm:inline-block text-ivory/50 group-hover:text-gold">
              ESC
            </span>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Center Stage: Image and Left/Right Navigation */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-charcoal/60 hover:bg-henna border border-gold/40 text-gold hover:text-ivory transition-all duration-300 shadow-editorial focus:outline-none"
            aria-label="Previous Image"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Active Image Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="max-h-[65vh] sm:max-h-[70vh] max-w-4xl w-full flex items-center justify-center p-2"
            >
              <div className="relative max-h-full max-w-full overflow-hidden border border-gold/30 shadow-2xl bg-ivory">
                <EditorialImage
                  src={currentItem.image}
                  placeholder={currentItem.placeholder}
                  alt={currentItem.altText || currentItem.title}
                  fallbackTitle={currentItem.title}
                  fallbackSubtitle={currentItem.stainTone}
                  className="max-h-[62vh] sm:max-h-[68vh] w-auto object-contain mx-auto"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-charcoal/60 hover:bg-henna border border-gold/40 text-gold hover:text-ivory transition-all duration-300 shadow-editorial focus:outline-none"
            aria-label="Next Image"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Bottom Details Bar */}
        <div className="z-20 border-t border-gold/20 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <h3 className="font-serif text-xl sm:text-2xl text-ivory font-medium">
              {currentItem.title}
            </h3>
            <p className="text-xs text-gold-light flex items-center gap-2">
              <span>{currentItem.brideName}</span>
              <span>·</span>
              <span>{currentItem.venueOrCity}</span>
              <span>·</span>
              <span className="text-ivory/60">{currentItem.stainTone}</span>
            </p>
            <p className="text-xs text-ivory/70 font-light leading-relaxed hidden sm:block">
              {currentItem.storyNote}
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              selectAndScrollToBooking({
                type: 'service',
                id: currentItem.id,
                title: currentItem.title,
                tagline: `${currentItem.categoryLabel} · ${currentItem.venueOrCity}`,
                category: currentItem.serviceCategory,
              });
            }}
            className="px-6 py-2.5 bg-henna text-ivory text-xs uppercase tracking-[0.2em] border border-gold hover:bg-henna-dark transition-all duration-300 shadow-fine flex-shrink-0"
          >
            {currentItem.serviceCategory === 'makeup'
              ? 'Inquire About This Bridal Look'
              : currentItem.serviceCategory === 'parlour'
              ? 'Book This Studio Ritual'
              : 'Inquire About This Henna Design'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

