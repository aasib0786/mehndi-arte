import React, { useState } from 'react';
import { MandalaMotif } from '@/components/motifs';

interface EditorialImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  aspectRatio?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackTitle = 'Royal Bridal Henna',
  fallbackSubtitle = 'Handcrafted Sojat Archive',
  aspectRatio = '4/5',
  ...props
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div
      className={`relative overflow-hidden bg-ivory-warm/40 border border-gold/25 select-none ${containerClassName}`}
      style={{ aspectRatio }}
    >
      {!hasError ? (
        <>
          {/* Subtle loading placeholder shimmer */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-ivory paper-grain flex items-center justify-center text-gold/30">
              <MandalaMotif size={64} className="animate-spin" style={{ animationDuration: '30s' }} />
            </div>
          )}

          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
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

