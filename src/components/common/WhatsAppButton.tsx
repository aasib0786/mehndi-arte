import React from 'react';
import { brandConfig } from '@/lib/config';
import { useReducedMotion } from '@/lib/useReducedMotion';

export const WhatsAppButton: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const message = 'Hi, I want to enquire about mehndi booking';
  const waUrl = `https://wa.me/${brandConfig.whatsAppNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Inquire about bridal mehndi booking on WhatsApp"
        className="group relative flex items-center justify-center"
      >
        {/* Ambient gentle pulse rings (disabled if user prefers reduced motion) */}
        {!prefersReducedMotion && (
          <>
            <span className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-60 pointer-events-none" />
            <span className="absolute -inset-1.5 rounded-full border border-gold/30 animate-pulse pointer-events-none" />
          </>
        )}

        {/* Hover Pill Tooltip */}
        <span className="absolute right-full mr-3.5 px-3.5 py-1.5 rounded-none bg-charcoal text-ivory text-xs uppercase tracking-[0.16em] whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-editorial border border-gold/40 hidden sm:inline-block">
          <span className="font-serif text-gold-light mr-1">✦</span>
          Inquire via WhatsApp
        </span>

        {/* Button Icon Container */}
        <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-henna text-ivory border-2 border-gold flex items-center justify-center shadow-gold group-hover:scale-105 group-hover:bg-henna-dark transition-all duration-300">
          {/* WhatsApp SVG Icon */}
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="currentColor"
            className="text-ivory group-hover:text-gold transition-colors duration-300"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.68 8.23-8.22 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1.01 2.55.12.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z" />
          </svg>
        </div>
      </a>
    </aside>
  );
};

