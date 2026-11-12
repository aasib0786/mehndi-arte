import React from 'react';

interface AtelierSealMotifProps {
  size?: number;
  className?: string;
  sealColor?: string;
  textColor?: string;
}

/**
 * Authentic circular heritage atelier wax seal / gold medallion motif.
 * Features beaded ring, circular inscription, central lotus floret and Hindi "शगुन" calligraphy.
 */
export const AtelierSealMotif: React.FC<AtelierSealMotifProps> = ({
  size = 96,
  className = '',
  sealColor = '#B8893A',
  textColor = '#5A1E1B',
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Scalloped / Starburst Seal Edge */}
      <circle cx="60" cy="60" r="56" stroke={sealColor} strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="60" cy="60" r="52" stroke={sealColor} strokeWidth="1.5" />
      <circle cx="60" cy="60" r="48" stroke={sealColor} strokeWidth="0.75" />

      {/* Decorative Beaded Ring */}
      <circle cx="60" cy="60" r="44" stroke={sealColor} strokeWidth="0.5" strokeDasharray="1.5 2.5" />

      {/* Circular Inscription Path */}
      <path
        id="sealTextPath"
        d="M 60,60 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
        fill="none"
      />
      <text fill={sealColor} fontSize="6.5" fontFamily="'Cormorant Garamond', serif" letterSpacing="2">
        <textPath href="#sealTextPath" startOffset="50%" textAnchor="middle">
          ✦ KASHISH ATELIER • 100% ORGANIC SOJAT • ESTD 2016 ✦
        </textPath>
      </text>

      {/* Inner Rosette / Lotus Crest */}
      <circle cx="60" cy="60" r="22" stroke={sealColor} strokeWidth="1" />
      <circle cx="60" cy="60" r="20" fill={sealColor} fillOpacity="0.08" />

      {/* Stylized Lotus Petals in Center */}
      <path
        d="M60 46 C56 52 52 56 52 62 C52 67 56 71 60 71 C64 71 68 67 68 62 C68 56 64 52 60 46 Z"
        fill={textColor}
        fillOpacity="0.85"
      />
      <path
        d="M52 56 C46 58 44 64 47 68 C50 71 56 70 57 66 C57 62 55 58 52 56 Z"
        fill={sealColor}
        fillOpacity="0.75"
      />
      <path
        d="M68 56 C74 58 76 64 73 68 C70 71 64 70 63 66 C63 62 65 58 68 56 Z"
        fill={sealColor}
        fillOpacity="0.75"
      />
      <circle cx="60" cy="63" r="2" fill="#FAF5ED" />

      {/* Micro Stars */}
      <circle cx="60" cy="39" r="1.2" fill={sealColor} />
      <circle cx="60" cy="81" r="1.2" fill={sealColor} />
      <circle cx="39" cy="60" r="1.2" fill={sealColor} />
      <circle cx="81" cy="60" r="1.2" fill={sealColor} />
    </svg>
  );
};

