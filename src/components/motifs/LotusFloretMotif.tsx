import React from 'react';

interface MotifProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const LotusFloretMotif: React.FC<MotifProps> = ({
  className = 'text-gold',
  size = 64,
  strokeWidth = 1.25,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Central Lotus Petal */}
      <path
        d="M50 12 C44 26 44 44 50 62 C56 44 56 26 50 12 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Midrib & Stippling */}
      <line
        x1="50"
        y1="20"
        x2="50"
        y2="54"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeDasharray="2 2"
      />

      {/* Flanking Tier 1 Petals */}
      <path
        d="M50 62 C40 50 32 34 38 22 C43 28 47 42 50 62"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 62 C60 50 68 34 62 22 C57 28 53 42 50 62"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Flanking Tier 2 Outer Wings */}
      <path
        d="M50 62 C34 54 22 42 20 32 C26 34 36 44 50 62"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />
      <path
        d="M50 62 C66 54 78 42 80 32 C74 34 64 44 50 62"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />

      {/* Base Calyx & Auspicious Pearls */}
      <path
        d="M26 62 Q 50 72 74 62"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.1}
        strokeLinecap="round"
      />
      <path
        d="M32 67 Q 50 76 68 67"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
      />

      {/* Droplet Bindu at Base */}
      <circle cx="50" cy="74" r="2" fill="currentColor" />
      <circle cx="42" cy="71" r="1.2" fill="currentColor" />
      <circle cx="58" cy="71" r="1.2" fill="currentColor" />

      {/* Crown Jewel Bindu above apex */}
      <circle cx="50" cy="6" r="2" fill="currentColor" />
    </svg>
  );
};

