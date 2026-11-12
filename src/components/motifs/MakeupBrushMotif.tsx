import React from 'react';

interface MotifProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const MakeupBrushMotif: React.FC<MotifProps> = ({
  className = 'text-gold',
  size = 64,
  strokeWidth = 1.25,
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
      {/* Soft dome bristles (feathered contour) */}
      <path
        d="M36 40 C34 26 42 12 50 10 C58 12 66 26 64 40 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bristle texture lines (fine line-art stippling) */}
      <path
        d="M44 38 C43 28 47 18 50 14 C53 18 57 28 56 38"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      <line
        x1="50"
        y1="16"
        x2="50"
        y2="38"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeDasharray="1.5 2"
      />

      {/* Metal Ferrule Band */}
      <path
        d="M35 40 H65 V54 H35 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="35"
        y1="46"
        x2="65"
        y2="46"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
      />

      {/* Sleek Tapered Handle */}
      <path
        d="M38 54 L44 92 C45 95 55 95 56 92 L62 54"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Decorative Gold Accent Rings */}
      <line
        x1="43"
        y1="72"
        x2="57"
        y2="72"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
      />
      <circle cx="50" cy="85" r="1.2" fill="currentColor" />
    </svg>
  );
};

