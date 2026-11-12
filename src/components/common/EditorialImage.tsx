import React, { useState } from 'react';
import { MandalaMotif } from '@/components/motifs';

interface EditorialImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  aspectRatio?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  placeholder,
  className = '',
  containerClassName = '',
  fallbackTitle = 'Royal Bridal Henna',
  fallbackSubtitle = 'Handcrafted Sojat Archive',
  aspectRatio,
  ...props
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div
      className={`relative overflow-hidden bg-ivory-warm/40 border border-gold/25 select-none ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!hasError ? (
        <>
          {/* Shimmering Blur Placeholder while image loads */}
          {!isLoaded && placeholder && (
            <img
              src={placeholder}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover filter blur-md scale-105 z-10 pointer-events-none"
            />
          )}

          {!isLoaded && !placeholder && (
            <div
              className="absolute inset-0 bg-ivory paper-grain flex items-center justify-center text-gold/30 z-10 transition-opacity duration-500"
              style={{ filter: 'blur(8px)' }}
            >
              <MandalaMotif size={64} className="animate-spin-slow opacity-40" />
            </div>
          )}

          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            style={{
              filter: isLoaded ? 'blur(0px)' : 'blur(12px)',
              transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
              transition: 'filter 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease-out',
            }}
            className={`w-full h-full object-cover ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...props}
          />
        </>
      ) : (
        /* Award-winning ivory parchment fallback with mandala outline */
        <div className="absolute inset-0 bg-ivory paper-grain flex flex-col items-center justify-center p-6 text-center border border-gold/30 ornate-corners">
          {/* Background watermark mandala */}
          <div className="absolute inset-0 flex items-center justify-center text-gold/15 pointer-events-none">
            <MandalaMotif size={140} />
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-2">
            <div className="text-gold/70 mb-1">
              <MandalaMotif size={44} />
            </div>
            <span className="font-serif text-lg sm:text-xl text-henna leading-snug">
              {fallbackTitle}
            </span>
            <span className="font-vibes text-sm sm:text-base text-gold-dark">
              {fallbackSubtitle}
            </span>
            <div className="w-12 h-[1px] bg-gold/40 mt-1" />
          </div>
        </div>
      )}
    </div>
  );
};
