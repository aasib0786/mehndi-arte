import React from 'react';

interface MotifProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const FloralVineMotif: React.FC<MotifProps> = ({
  className = 'text-gold',
  size = 120,
  strokeWidth = 1.25,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.35)}
      viewBox="0 0 200 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Central Flowing S-Stem */}
      <path
        d="M10 45 C40 45 55 20 85 24 C115 28 125 55 155 45 C175 38 185 28 195 24"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Center Rose / Lotus Floret */}
      <circle cx="100" cy="36" r="3.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M100 28 C104 31 106 35 106 38 C100 42 94 38 94 35 C94 31 96 28 100 28 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
      />
      <path
        d="M108 36 C105 40 101 42 98 42 C94 42 92 37 95 34"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />

      {/* Left Leaf Cluster */}
      <path
        d="M48 34 C44 24 32 24 30 32 C38 34 44 38 48 34 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 29 C40 33 46 34 48 34"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.65}
      />

      <path
        d="M68 23 C72 14 82 14 84 22 C78 24 72 26 68 23 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Leaf Cluster */}
      <path
        d="M136 50 C140 60 152 60 154 52 C146 50 140 46 136 50 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M150 55 C144 51 138 50 136 50"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.65}
      />

      <path
        d="M168 40 C174 32 184 34 184 42 C178 44 172 44 168 40 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Delicate Spiral Tendrils */}
      <path
        d="M25 45 C20 48 18 53 22 56 C26 58 30 55 29 51"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />
      <path
        d="M185 24 C189 20 193 18 195 21 C197 24 195 27 192 27"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />

      {/* Micro Henna Dots */}
      <circle cx="56" cy="46" r="1.5" fill="currentColor" />
      <circle cx="118" cy="28" r="1.5" fill="currentColor" />
      <circle cx="178" cy="49" r="1.5" fill="currentColor" />
    </svg>
  );
};

