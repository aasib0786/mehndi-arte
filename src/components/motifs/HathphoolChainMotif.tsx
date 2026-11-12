import React from 'react';

interface HathphoolChainMotifProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

/**
 * Fine-line Indian bridal jewelry chain (Hathphool / Kalira) motif.
 * Delicate micro-pearls, connecting links, and small droplet charms for heirloom dividers.
 */
export const HathphoolChainMotif: React.FC<HathphoolChainMotifProps> = ({
  className = '',
  width = '100%',
  height = 16,
  color = '#B8893A',
}) => {
  return (
    <svg
      viewBox="0 0 360 16"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Central continuous hairline */}
      <line x1="0" y1="8" x2="360" y2="8" stroke={color} strokeWidth="0.75" strokeOpacity="0.4" />

      {/* Decorative repeated floral links */}
      {[30, 90, 150, 210, 270, 330].map((x) => (
        <g key={x}>
          <circle cx={x} cy="8" r="3.5" stroke={color} strokeWidth="0.8" fill="#F7F1E6" />
          <circle cx={x} cy="8" r="1.5" fill={color} />
          {/* Hanging droplet charm */}
          <path
            d={`M${x} 11.5 C${x - 1.5} 13 ${x - 1.5} 14.5 ${x} 15.5 C${x + 1.5} 14.5 ${x + 1.5} 13 ${x} 11.5 Z`}
            fill={color}
            fillOpacity="0.75"
          />
        </g>
      ))}

      {/* Intermediary micro beads */}
      {[10, 50, 70, 110, 130, 170, 190, 230, 250, 290, 310, 350].map((x) => (
        <circle key={x} cx={x} cy="8" r="1" fill={color} fillOpacity="0.5" />
      ))}
    </svg>
  );
};

