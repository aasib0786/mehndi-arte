import React from 'react';

interface MotifProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const CompactMirrorMotif: React.FC<MotifProps> = ({
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
      {/* Top Lid (Tilted Open Mirror) */}
      <ellipse
        cx="50"
        cy="32"
        rx="34"
        ry="20"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Inner Mirror Glass Inset */}
      <ellipse
        cx="50"
        cy="32"
        rx="28"
        ry="15"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeDasharray="3 2"
      />
      {/* Light Reflection Glint on Mirror */}
      <path
        d="M40 24 Q 48 20 56 22"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
      />

      {/* Hinge Connection */}
      <path
        d="M44 48 H56 V53 H44 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Bottom Powder Base Tray */}
      <ellipse
        cx="50"
        cy="68"
        rx="36"
        ry="22"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Inner Powder Well Rim */}
      <ellipse
        cx="50"
        cy="68"
        rx="29"
        ry="16"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
      />

      {/* Embossed Sunburst / Lotus Pattern in Powder */}
      <circle
        cx="50"
        cy="68"
        r="5"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
      />
      <line x1="50" y1="56" x2="50" y2="60" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />
      <line x1="50" y1="76" x2="50" y2="80" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />
      <line x1="36" y1="68" x2="40" y2="68" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />
      <line x1="60" y1="68" x2="64" y2="68" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />
    </svg>
  );
};

