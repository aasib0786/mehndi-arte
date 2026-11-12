import React from 'react';

interface MotifProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const LipstickMotif: React.FC<MotifProps> = ({
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
      {/* Beveled Lipstick Bullet Tip */}
      <path
        d="M40 38 L40 22 C40 16 46 10 50 8 L60 20 L60 38 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bevel Chamfer Angle */}
      <line
        x1="40"
        y1="22"
        x2="60"
        y2="20"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />

      {/* Inner Extension Tube */}
      <path
        d="M37 38 H63 V48 H37 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Luxury Metallic Middle Band Ring */}
      <path
        d="M34 48 H66 V56 H34 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="34"
        y1="52"
        x2="66"
        y2="52"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
      />

      {/* Square / Fluted Base Casing */}
      <path
        d="M35 56 H65 V92 C65 94 63 96 61 96 H39 C37 96 35 94 35 92 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Fine Vertical Fluting Lines on Base */}
      <line
        x1="43"
        y1="60"
        x2="43"
        y2="92"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeDasharray="2 2"
      />
      <line
        x1="50"
        y1="60"
        x2="50"
        y2="92"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
      />
      <line
        x1="57"
        y1="60"
        x2="57"
        y2="92"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeDasharray="2 2"
      />
    </svg>
  );
};

