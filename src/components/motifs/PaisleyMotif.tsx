import React from 'react';

interface MotifProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const PaisleyMotif: React.FC<MotifProps> = ({
  className = 'text-gold',
  size = 64,
  strokeWidth = 1.25,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer Curving Mango / Kalka Contour */}
      <path
        d="M50 110 C20 110 10 82 10 58 C10 32 30 18 52 10 C62 6 78 8 84 18 C88 25 86 36 78 40 C70 44 60 38 64 28 C66 22 62 18 56 20 C42 24 24 38 24 60 C24 80 34 98 52 98 C68 98 84 84 84 66 C84 54 78 48 76 44"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Internal Tear-drop Core */}
      <path
        d="M48 90 C32 90 26 74 26 58 C26 42 36 32 46 26 C48 34 52 38 56 38 C60 38 66 32 64 24 C56 26 48 32 44 40 C38 48 38 64 48 76 C54 82 62 80 66 74"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Micro Floral Center */}
      <circle cx="48" cy="62" r="4.5" stroke="currentColor" strokeWidth={strokeWidth * 0.85} />
      <path
        d="M48 53 V57.5 M48 66.5 V71 M40 62 H43.5 M52.5 62 H56"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />

      {/* Feathered Lace Edge (Scallops) */}
      <path
        d="M20 70 C16 72 14 76 16 80 C18 84 22 84 24 82"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
      <path
        d="M26 84 C24 88 26 92 30 94 C34 96 38 94 40 90"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
      <path
        d="M44 94 C46 98 50 102 56 102 C62 102 66 98 68 94"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />

      {/* Stylized Droplet Accents */}
      <circle cx="70" cy="50" r="1.5" fill="currentColor" />
      <circle cx="74" cy="60" r="1.5" fill="currentColor" />
      <circle cx="72" cy="72" r="1.5" fill="currentColor" />
    </svg>
  );
};

