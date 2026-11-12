import React from 'react';

interface CornerProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const OrnateCornerFlourish: React.FC<CornerProps> = ({
  className = 'text-gold',
  size = 32,
  strokeWidth = 1.2,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer L-Bracket Frame */}
      <path
        d="M2 38 V8 C2 4.7 4.7 2 8 2 H38"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Inner Inset Bracket */}
      <path
        d="M7 38 V12 C7 9.2 9.2 7 12 7 H38"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
      {/* Delicate Spiral Henna Paisley Curl */}
      <path
        d="M12 18 C12 14.5 14.5 12 18 12 C21 12 23 14 23 17 C23 20 20 22 17 22 C15 22 14 21 14 19 C14 17.5 15.2 16.5 16.5 16.5"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />
      {/* Auspicious Henna Bindu Dots */}
      <circle cx="5" cy="5" r="1.5" fill="currentColor" />
      <circle cx="28" cy="4.5" r="1" fill="currentColor" />
      <circle cx="4.5" cy="28" r="1" fill="currentColor" />
    </svg>
  );
};

