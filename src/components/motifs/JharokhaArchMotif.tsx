import React from 'react';

interface MotifProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const JharokhaArchMotif: React.FC<MotifProps> = ({
  className = 'text-gold',
  size = 120,
  strokeWidth = 1.2,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer Cusped Arch Contour */}
      <path
        d="M10 125 V50 C10 40 18 32 26 30 C26 22 34 16 42 16 C46 16 48 10 50 4 C52 10 54 16 58 16 C66 16 74 22 74 30 C82 32 90 40 90 50 V125"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Parallel Arch Frame */}
      <path
        d="M16 125 V52 C16 44 22 38 30 36 C30 29 37 23 44 22 C47 22 49 18 50 12 C51 18 53 22 56 22 C63 23 70 29 70 36 C78 38 84 44 84 52 V125"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeDasharray="2.5 2"
        strokeLinecap="round"
      />

      {/* Apex Kalash Finial */}
      <circle cx="50" cy="3" r="1.5" fill="currentColor" />

      {/* Hanging Bell / Jhumki Pendant at Arch Apex */}
      <line x1="50" y1="22" x2="50" y2="34" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
      <path
        d="M46 34 Q 50 38 54 34 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        fill="none"
      />
      <circle cx="50" cy="40" r="1.2" fill="currentColor" />

      {/* Heritage Jaali Crosshatch Base / Side Pillars */}
      <line x1="10" y1="125" x2="90" y2="125" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="6" y1="128" x2="94" y2="128" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />

      {/* Pillar Detailing Marks */}
      <line x1="10" y1="60" x2="16" y2="60" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
      <line x1="10" y1="90" x2="16" y2="90" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
      <line x1="84" y1="60" x2="90" y2="60" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
      <line x1="84" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
    </svg>
  );
};

