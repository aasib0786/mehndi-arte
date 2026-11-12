import React from 'react';

interface BrushStrokeFlourishProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

/**
 * Handcrafted calligraphic brush stroke / kajal sweep motif with gold foil organic texture.
 * Used beneath high-fashion editorial titles, author pull-quotes, and section headers.
 */
export const BrushStrokeFlourish: React.FC<BrushStrokeFlourishProps> = ({
  className = '',
  width = 160,
  height = 14,
  color = '#B8893A',
}) => {
  return (
    <svg
      viewBox="0 0 240 18"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 12C35 4 85 2 135 4C175 5.5 215 10 238 8C210 13 160 16 110 14C65 12 25 15 2 12Z"
        fill={color}
        fillOpacity="0.85"
      />
      <path
        d="M12 9C55 5 115 3 175 6C195 7 220 11 232 9C195 12 145 14 95 12C50 10.5 25 11 12 9Z"
        fill={color}
        fillOpacity="0.4"
      />
      <circle cx="236" cy="8" r="1.5" fill={color} />
      <circle cx="4" cy="12" r="1.5" fill={color} fillOpacity="0.6" />
    </svg>
  );
};

