const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function renderSvgToWebp(filename, svgString, width = 1200, height = 800) {
  const fullPath = path.join(IMAGES_DIR, `${filename}.webp`);
  const blurPath = path.join(IMAGES_DIR, `${filename}-blur.webp`);

  const svgBuffer = Buffer.from(svgString);

  await sharp(svgBuffer)
    .resize(width, height)
    .webp({ quality: 85, effort: 5 })
    .toFile(fullPath);

  await sharp(svgBuffer)
    .resize(32, Math.round((32 * height) / width))
    .blur(3)
    .webp({ quality: 30 })
    .toFile(blurPath);

  console.log(`✓ Generated ${filename}.webp & ${filename}-blur.webp`);
}

async function generateJourneyAssets() {
  const steps = [
    {
      num: '01',
      name: 'journey-1',
      title: 'CONSULTATION &amp; TRIAL',
      subtitle: 'LEHENGA COORDINATION &amp; ORGANIC SKIN TEST',
      tag: 'PHASE 01',
      color: '#4A1D1B',
      accent: '#B8893A',
      icon: `
        <circle cx="600" cy="380" r="80" fill="none" stroke="#B8893A" stroke-width="2"/>
        <path d="M 560,380 L 640,380 M 600,340 L 600,420" stroke="#B8893A" stroke-width="2"/>
        <circle cx="600" cy="380" r="110" fill="none" stroke="#B8893A" stroke-width="1" stroke-dasharray="6 4"/>
      `,
    },
    {
      num: '02',
      name: 'journey-2',
      title: 'PRE-BRIDAL GLOW SESSIONS',
      subtitle: 'ATELIER FACIALS, WAXING &amp; ROSE MANI-PEDI',
      tag: 'PHASE 02',
      color: '#2A1F18',
      accent: '#D4AF37',
      icon: `
        <ellipse cx="600" cy="380" rx="90" ry="70" fill="none" stroke="#D4AF37" stroke-width="2"/>
        <path d="M 530,380 Q 600,330 670,380 Q 600,430 530,380 Z" fill="#D4AF37" fill-opacity="0.25"/>
        <circle cx="600" cy="380" r="25" fill="#D4AF37" fill-opacity="0.6"/>
      `,
    },
    {
      num: '03',
      name: 'journey-3',
      title: 'CEREMONIAL MEHNDI DAY',
      subtitle: '100% ORGANIC SOJAT HENNA &amp; BESPOKE MOTIFS',
      tag: 'PHASE 03',
      color: '#3B1210',
      accent: '#E8CFC6',
      icon: `
        <!-- Mehndi cone & mandala -->
        <polygon points="600,280 570,440 630,440" fill="none" stroke="#E8CFC6" stroke-width="2.5"/>
        <line x1="600" y1="280" x2="600" y2="470" stroke="#B8893A" stroke-width="2"/>
        <circle cx="600" cy="475" r="5" fill="#B8893A"/>
      `,
    },
    {
      num: '04',
      name: 'journey-4',
      title: 'WEDDING DAY MAKEUP &amp; HAIR',
      subtitle: 'TEMPTU AIRBRUSH, MINK LASHES &amp; GAJRA BUN',
      tag: 'PHASE 04',
      color: '#211816',
      accent: '#B8893A',
      icon: `
        <!-- Brush & mirror motif -->
        <circle cx="600" cy="370" r="75" fill="none" stroke="#B8893A" stroke-width="2"/>
        <line x1="530" y1="440" x2="670" y2="300" stroke="#B8893A" stroke-width="3"/>
        <rect x="510" y="440" width="30" height="15" fill="#B8893A" transform="rotate(-45 525 447)"/>
      `,
    },
    {
      num: '05',
      name: 'journey-5',
      title: 'AFTERCARE &amp; COLOR OXIDATION',
      subtitle: '48-HOUR NATURAL MAHOGANY PEAK &amp; CLOVE BALM',
      tag: 'PHASE 05',
      color: '#1C0D0C',
      accent: '#D4AF37',
      icon: `
        <!-- Warm heat flame & lotus -->
        <circle cx="600" cy="380" r="85" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="8 6"/>
        <path d="M 600,320 Q 640,370 600,430 Q 560,370 600,320 Z" fill="#D4AF37" fill-opacity="0.4"/>
      `,
    },
  ];

  for (const step of steps) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
        <defs>
          <radialGradient id="grad-${step.name}" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stop-color="${step.color}"/>
            <stop offset="100%" stop-color="#0E0706"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grad-${step.name})"/>
        
        <!-- Ornate border frame -->
        <rect x="40" y="40" width="1120" height="720" fill="none" stroke="${step.accent}" stroke-width="1.5" stroke-opacity="0.4"/>
        <rect x="55" y="55" width="1090" height="690" fill="none" stroke="${step.accent}" stroke-width="1" stroke-opacity="0.2" stroke-dasharray="6 4"/>
        
        <!-- Big Number Watermark -->
        <text x="600" y="240" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="140" fill="${step.accent}" fill-opacity="0.12" font-weight="bold">
          ${step.num}
        </text>

        <!-- Graphic Motif -->
        ${step.icon}

        <!-- Texts -->
        <text x="600" y="520" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="14" fill="${step.accent}" letter-spacing="6">
          ✦ ${step.tag} ✦
        </text>
        <text x="600" y="580" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="42" fill="#F7F1E6" font-weight="normal">
          ${step.title}
        </text>
        <text x="600" y="630" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="14" fill="#E8CFC6" letter-spacing="3">
          ${step.subtitle}
        </text>
      </svg>
    `;
    await renderSvgToWebp(step.name, svg, 1200, 800);
  }
}

async function generateReelAssets() {
  const reels = [
    { name: 'reel-1', title: '48-Hour Stain Reveal', views: '128K Views', tag: 'Oxidation Peak', color: '#3A100E' },
    { name: 'reel-2', title: 'Jharokha Architectural Symmetry', views: '84K Views', tag: 'Handcrafted Jaal', color: '#2B1412' },
    { name: 'reel-3', title: 'Peeling Paste with Clove Oil', views: '215K Views', tag: 'Herbal Peeling', color: '#441715' },
    { name: 'reel-4', title: 'Baraat Procession Silhouette', views: '96K Views', tag: 'Dulha Baraat', color: '#231514' },
    { name: 'reel-5', title: 'Airy Negative Space Glove', views: '64K Views', tag: 'Modern Arabic', color: '#1B241A' },
    { name: 'reel-6', title: 'Behind the Cones: Sojat Mixing', views: '142K Views', tag: '100% Organic', color: '#351817' },
  ];

  for (const reel of reels) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280" viewBox="0 0 720 1280">
        <defs>
          <radialGradient id="grad-${reel.name}" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stop-color="${reel.color}"/>
            <stop offset="100%" stop-color="#0F0606"/>
          </radialGradient>
        </defs>
        <rect width="720" height="1280" fill="url(#grad-${reel.name})"/>
        
        <!-- Video reel ornate frame -->
        <rect x="30" y="30" width="660" height="1220" fill="none" stroke="#B8893A" stroke-width="1.5" stroke-opacity="0.4"/>
        <rect x="45" y="45" width="630" height="1190" fill="none" stroke="#B8893A" stroke-width="1" stroke-opacity="0.2" stroke-dasharray="6 4"/>

        <!-- Center Mandala Watermark -->
        <g stroke="#B8893A" stroke-width="1.5" fill="none" opacity="0.2" transform="translate(360,600)">
          <circle r="160"/>
          <circle r="120" stroke-dasharray="6 6"/>
          <circle r="80"/>
          <circle r="40"/>
        </g>

        <!-- Play Button -->
        <circle cx="360" cy="580" r="54" fill="#5A1E1B" stroke="#B8893A" stroke-width="2.5" filter="drop-shadow(0 10px 25px rgba(0,0,0,0.5))"/>
        <polygon points="350,555 385,580 350,605" fill="#F7F1E6"/>

        <!-- Top Badges -->
        <rect x="60" y="70" width="130" height="34" rx="4" fill="#000000" fill-opacity="0.6" stroke="#B8893A" stroke-width="1"/>
        <text x="125" y="92" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="12" fill="#F7F1E6" letter-spacing="1.5">
          ${reel.views}
        </text>

        <!-- Bottom Captions -->
        <rect x="45" y="1050" width="630" height="185" fill="#000000" fill-opacity="0.45"/>
        <text x="80" y="1100" font-family="'Manrope', sans-serif" font-size="13" fill="#B8893A" letter-spacing="3">
          ✦ #${reel.tag.toUpperCase()} ✦
        </text>
        <text x="80" y="1145" font-family="'Cormorant Garamond', serif" font-size="32" fill="#F7F1E6" font-weight="normal">
          ${reel.title}
        </text>
        <text x="80" y="1185" font-family="'Manrope', sans-serif" font-size="13" fill="#C9A193" letter-spacing="1">
          @kashishmehndiart · Watch on Instagram ↗
        </text>
      </svg>
    `;
    await renderSvgToWebp(reel.name, svg, 720, 1280);
  }
}

async function main() {
  console.log('Generating Journey and Reels assets...');
  await generateJourneyAssets();
  await generateReelAssets();
  console.log('Finished generating Journey and Reels assets!');
}

main().catch(console.error);

