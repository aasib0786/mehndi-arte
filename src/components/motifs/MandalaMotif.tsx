import React from 'react';

interface MotifProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const MandalaMotif: React.FC<MotifProps> = ({
  className = 'text-gold',
  size = 64,
  strokeWidth = 1.2,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Central Bindu & Core Circles */}
      <circle cx="50" cy="50" r="3.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="50" cy="50" r="8.5" stroke="currentColor" strokeWidth={strokeWidth * 0.9} />
      <circle
        cx="50"
        cy="50"
        r="14"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeDasharray="2.5 2.5"
      />

      {/* 8-Petal Inner Lotus */}
      <path
        d="M50 36 C53 41 57 41 57 45 C57 50 50 50 50 50 C50 50 43 50 43 45 C43 41 47 41 50 36 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 64 C53 59 57 59 57 55 C57 50 50 50 50 50 C50 50 43 50 43 55 C43 59 47 59 50 64 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 50 C41 53 41 57 45 57 C50 57 50 50 50 50 C50 50 50 43 45 43 C41 43 41 47 36 50 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64 50 C59 53 59 57 55 57 C50 57 50 50 50 50 C50 50 50 43 55 43 C59 43 59 47 64 50 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Diagonal Inner Petals */}
      <path
        d="M40 40 C43 45 47 47 50 50 C47 47 45 43 40 40 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
      <path
        d="M60 40 C57 45 53 47 50 50 C53 47 55 43 60 40 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
      <path
        d="M40 60 C43 55 47 53 50 50 C47 53 45 57 40 60 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
      <path
        d="M60 60 C57 55 53 53 50 50 C53 53 55 57 60 60 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />

      {/* Outer Mid Ring */}
      <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth={strokeWidth * 0.9} />
      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth={strokeWidth * 0.7} />

      {/* Scalloped Radiating Border (12 Arcs) */}
      <path
        d="M50 20 C54 18 58 18 62 21 C66 24 67 28 68 32 M68 32 C72 34 75 38 76 42 M76 42 C79 46 80 50 80 54 M80 54 C79 58 78 63 74 67 M74 67 C71 71 67 75 62 78 M62 78 C58 81 54 81 50 80 M50 80 C46 81 42 81 38 78 M38 78 C33 75 29 71 26 67 M26 67 C22 63 21 58 20 54 M20 54 C20 50 21 46 24 42 M24 42 C25 38 28 34 32 32 M32 32 C33 28 34 24 38 21 C42 18 46 18 50 20"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* External Fine Accent Rays */}
      <path
        d="M50 14 V19 M50 81 V86 M14 50 H19 M81 50 H86 M24 24 L28 28 M72 72 L76 76 M76 24 L72 28 M24 76 L28 72"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
    </svg>
  );
};

