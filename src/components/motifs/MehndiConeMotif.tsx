import React from 'react';

interface MotifProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const MehndiConeMotif: React.FC<MotifProps> = ({
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
      {/* Tapered Triangular Cone Body */}
      <path
        d="M28 20 L78 28 L36 86 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top Fold / Seal Flap */}
      <path
        d="M28 20 C34 14 50 12 78 28"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M32 23 L68 18"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />

      {/* Cellophane Foil Bands / Thread Wraps */}
      <path
        d="M32 36 L70 42"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
      <path
        d="M34 50 L58 55"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
      <path
        d="M35 64 L48 68"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />

      {/* Fine-Art Needle Tip */}
      <path
        d="M36 86 L34 94"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />

      {/* Henna Paste Droplet */}
      <path
        d="M34 96 C33 97 32 98.5 32 100 C32 101.5 33 103 34.5 103 C36 103 37 101.5 37 100 C37 98.5 35 97 34 96 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Artisan Spark / Starlet Accent */}
      <path
        d="M72 68 V76 M68 72 H76"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
      <circle cx="62" cy="78" r="1.25" fill="currentColor" />
    </svg>
  );
};

