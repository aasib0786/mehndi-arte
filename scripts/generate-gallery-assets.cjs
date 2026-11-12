const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Helper to convert SVG to WebP (full size & blur placeholder)
async function renderSvgToWebp(filename, svgString, width = 1200, height = 900) {
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

  console.log(`Generated: ${filename}.webp & ${filename}-blur.webp`);
}

// 1. Before / After comparisons
async function generateBeforeAfter() {
  // Mehndi Fresh (0h: Bright Warm Orange / Mustard henna paste & orange stain)
  const mehndiFreshSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <radialGradient id="bgFresh" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#FAF5EE"/>
          <stop offset="60%" stop-color="#F2E6D5"/>
          <stop offset="100%" stop-color="#E5D1BC"/>
        </radialGradient>
        <linearGradient id="hennaPaste" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C26A28"/>
          <stop offset="50%" stop-color="#D97724"/>
          <stop offset="100%" stop-color="#B35619"/>
        </linearGradient>
        <pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="#B8893A" opacity="0.1"/>
          <circle cx="70" cy="60" r="1.5" fill="#5A1E1B" opacity="0.08"/>
        </pattern>
      </defs>
      <rect width="1200" height="900" fill="url(#bgFresh)"/>
      <rect width="1200" height="900" fill="url(#grain)"/>

      <!-- Palm / Hand Silhouette -->
      <path d="M 400,850 C 420,700 440,600 480,500 C 510,420 540,320 560,250 C 570,210 590,210 600,250 C 620,330 630,420 640,480 C 660,390 680,290 700,230 C 710,200 730,200 740,235 C 755,300 760,400 765,490 C 785,410 805,330 820,280 C 830,250 850,255 855,290 C 865,370 860,470 850,560 C 880,510 910,470 930,460 C 950,450 965,470 950,500 C 910,580 880,680 840,850 Z" 
            fill="#F6EDE3" stroke="#D9A876" stroke-width="3" filter="drop-shadow(0 15px 35px rgba(184,137,58,0.25))"/>

      <!-- Fresh Bright Orange Henna Jaal & Mandalas -->
      <g stroke="url(#hennaPaste)" stroke-width="4.5" fill="none" opacity="0.95" stroke-linecap="round" stroke-linejoin="round">
        <!-- Center Mandala -->
        <circle cx="650" cy="620" r="85" stroke-dasharray="8 6"/>
        <circle cx="650" cy="620" r="60"/>
        <circle cx="650" cy="620" r="35" fill="#D97724" fill-opacity="0.25"/>
        <circle cx="650" cy="620" r="15" fill="#C26A28"/>
        <!-- Petals -->
        <path d="M 650,535 Q 675,570 650,605 Q 625,570 650,535 Z" fill="#D97724" fill-opacity="0.3"/>
        <path d="M 650,705 Q 675,670 650,635 Q 625,670 650,705 Z" fill="#D97724" fill-opacity="0.3"/>
        <path d="M 565,620 Q 600,645 635,620 Q 600,595 565,620 Z" fill="#D97724" fill-opacity="0.3"/>
        <path d="M 735,620 Q 700,645 665,620 Q 700,595 735,620 Z" fill="#D97724" fill-opacity="0.3"/>

        <!-- Jharokha Wrist Arch -->
        <path d="M 460,780 Q 650,710 840,780"/>
        <path d="M 480,820 Q 650,750 820,820" stroke-dasharray="6 6"/>
        <path d="M 500,850 Q 650,780 800,850"/>

        <!-- Finger Vines -->
        <path d="M 580,480 Q 590,380 585,270" stroke-width="3"/>
        <path d="M 690,490 Q 710,380 720,260" stroke-width="3"/>
        <path d="M 790,510 Q 820,410 835,310" stroke-width="3"/>
      </g>

      <!-- Label Watermark -->
      <text x="600" y="100" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="34" fill="#C26A28" letter-spacing="4">
        FRESH PASTE &amp; BRIGHT ORANGE PEEL (0 HRS)
      </text>
      <text x="600" y="140" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="14" fill="#8C5020" letter-spacing="3">
        ORGANIC SOJAT LEAVES · WARM GOLDEN AMBER HUE
      </text>
    </svg>
  `;

  // Mehndi Dark (48h: Deep Cherry Mahogany & Espresso Black)
  const mehndiDarkSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <radialGradient id="bgDark" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#2C1A1A"/>
          <stop offset="60%" stop-color="#1F1212"/>
          <stop offset="100%" stop-color="#140B0B"/>
        </radialGradient>
        <linearGradient id="hennaDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4A1412"/>
          <stop offset="50%" stop-color="#2D0B0A"/>
          <stop offset="100%" stop-color="#1A0505"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bgDark)"/>

      <!-- Palm / Hand Silhouette -->
      <path d="M 400,850 C 420,700 440,600 480,500 C 510,420 540,320 560,250 C 570,210 590,210 600,250 C 620,330 630,420 640,480 C 660,390 680,290 700,230 C 710,200 730,200 740,235 C 755,300 760,400 765,490 C 785,410 805,330 820,280 C 830,250 850,255 855,290 C 865,370 860,470 850,560 C 880,510 910,470 930,460 C 950,450 965,470 950,500 C 910,580 880,680 840,850 Z" 
            fill="#EAD2BC" stroke="#B8893A" stroke-width="3" filter="drop-shadow(0 20px 45px rgba(0,0,0,0.6))"/>

      <!-- Deep Mahogany Oxidized Stain -->
      <g stroke="#3B0C0A" stroke-width="5" fill="none" opacity="0.98" stroke-linecap="round" stroke-linejoin="round">
        <!-- Center Mandala -->
        <circle cx="650" cy="620" r="85" stroke-dasharray="8 6"/>
        <circle cx="650" cy="620" r="60"/>
        <circle cx="650" cy="620" r="35" fill="#4A1412" fill-opacity="0.85"/>
        <circle cx="650" cy="620" r="15" fill="#250505"/>
        <!-- Petals -->
        <path d="M 650,535 Q 675,570 650,605 Q 625,570 650,535 Z" fill="#3B0C0A" fill-opacity="0.9"/>
        <path d="M 650,705 Q 675,670 650,635 Q 625,670 650,705 Z" fill="#3B0C0A" fill-opacity="0.9"/>
        <path d="M 565,620 Q 600,645 635,620 Q 600,595 565,620 Z" fill="#3B0C0A" fill-opacity="0.9"/>
        <path d="M 735,620 Q 700,645 665,620 Q 700,595 735,620 Z" fill="#3B0C0A" fill-opacity="0.9"/>

        <!-- Jharokha Wrist Arch -->
        <path d="M 460,780 Q 650,710 840,780" stroke-width="6"/>
        <path d="M 480,820 Q 650,750 820,820" stroke-dasharray="6 6"/>
        <path d="M 500,850 Q 650,780 800,850" stroke-width="6"/>

        <!-- Finger Vines -->
        <path d="M 580,480 Q 590,380 585,270" stroke-width="4.5"/>
        <path d="M 690,490 Q 710,380 720,260" stroke-width="4.5"/>
        <path d="M 790,510 Q 820,410 835,310" stroke-width="4.5"/>
      </g>

      <!-- Label Watermark -->
      <text x="600" y="100" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="34" fill="#B8893A" letter-spacing="4">
        48-HOUR MATURED STAIN · DEEP MAHOGANY
      </text>
      <text x="600" y="140" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="14" fill="#E8CFC6" letter-spacing="3">
        CLOVE ESSENCE OXIDATION · ZERO CHEMICALS · RICH ESPRESSO
      </text>
    </svg>
  `;

  // 2. Makeup Bare Face vs Final Glam
  const makeupBareSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <radialGradient id="bgSkin" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#F5EBE1"/>
          <stop offset="100%" stop-color="#E4D2C3"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bgSkin)"/>
      <!-- Soft face contour outline -->
      <path d="M 440,250 C 440,150 760,150 760,250 C 770,400 780,580 600,750 C 420,580 430,400 440,250 Z" 
            fill="#F3E1D2" stroke="#D1B39D" stroke-width="2" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.08))"/>
      
      <!-- Natural eyebrows -->
      <path d="M 490,380 Q 540,365 570,385" stroke="#7A5645" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M 630,385 Q 660,365 710,380" stroke="#7A5645" stroke-width="4" stroke-linecap="round" fill="none"/>

      <!-- Natural eyes closed / gentle -->
      <path d="M 500,420 Q 535,435 565,420" stroke="#8C6654" stroke-width="2.5" fill="none"/>
      <path d="M 635,420 Q 665,435 700,420" stroke="#8C6654" stroke-width="2.5" fill="none"/>

      <!-- Subtle nose & lip -->
      <path d="M 600,420 L 595,490 Q 600,505 605,505" stroke="#C8A590" stroke-width="2" fill="none"/>
      <path d="M 565,560 Q 600,545 635,560 Q 600,575 565,560 Z" fill="#DFA99B" stroke="#C88E80" stroke-width="1.5"/>

      <!-- Skin texture indicator -->
      <circle cx="530" cy="480" r="4" fill="#C99B87" opacity="0.4"/>
      <circle cx="680" cy="495" r="3" fill="#C99B87" opacity="0.3"/>

      <text x="600" y="100" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="34" fill="#5A1E1B" letter-spacing="4">
        NATURAL BARE SKIN PREP
      </text>
      <text x="600" y="140" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="14" fill="#7A5645" letter-spacing="3">
        CLEANSED · HYDRATED WITH BOTANICAL ELIXIRS · UNFILTERED
      </text>
    </svg>
  `;

  const makeupGlamSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <radialGradient id="bgGlam" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#3A1715"/>
          <stop offset="70%" stop-color="#240D0C"/>
          <stop offset="100%" stop-color="#140605"/>
        </radialGradient>
        <linearGradient id="goldGleam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#B8893A"/>
          <stop offset="50%" stop-color="#F2D89C"/>
          <stop offset="100%" stop-color="#B8893A"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bgGlam)"/>

      <!-- Royal Dupatta Drapery Backing -->
      <path d="M 300,120 Q 600,60 900,120 Q 980,450 940,850 L 260,850 Q 220,450 300,120 Z" fill="#5A1E1B" stroke="#B8893A" stroke-width="4"/>

      <!-- Sculpted Face -->
      <path d="M 440,250 C 440,150 760,150 760,250 C 770,400 780,580 600,750 C 420,580 430,400 440,250 Z" 
            fill="#F2DFC9" stroke="#B8893A" stroke-width="2" filter="drop-shadow(0 20px 40px rgba(0,0,0,0.5))"/>

      <!-- Maang Tikka Jewelry -->
      <circle cx="600" cy="230" r="14" fill="#B8893A" stroke="#F7F1E6" stroke-width="2"/>
      <path d="M 600,120 L 600,215" stroke="url(#goldGleam)" stroke-width="3" stroke-dasharray="4 3"/>

      <!-- High-Def Defined Brows -->
      <path d="M 480,380 Q 540,360 575,380" stroke="#231F1C" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M 625,380 Q 660,360 720,380" stroke="#231F1C" stroke-width="6" stroke-linecap="round" fill="none"/>

      <!-- Winged Liner & Smokey Champagne Eyes -->
      <path d="M 470,410 Q 530,395 570,415 L 565,425 Q 525,415 480,422 Z" fill="#231F1C"/>
      <path d="M 630,415 Q 670,395 730,410 L 720,422 Q 675,415 635,425 Z" fill="#231F1C"/>
      <!-- Gold Shimmer Cut-Crease -->
      <path d="M 495,405 Q 530,395 560,408" stroke="url(#goldGleam)" stroke-width="4" fill="none"/>
      <path d="M 640,408 Q 670,395 705,405" stroke="url(#goldGleam)" stroke-width="4" fill="none"/>

      <!-- Mink Lashes -->
      <path d="M 470,408 L 460,395 M 485,405 L 480,390 M 505,404 L 505,388 M 530,407 L 535,390" stroke="#111" stroke-width="2"/>
      <path d="M 730,408 L 740,395 M 715,405 L 720,390 M 695,404 L 695,388 M 670,407 L 665,390" stroke="#111" stroke-width="2"/>

      <!-- Sculpted Soft Contour & Blush -->
      <ellipse cx="485" cy="510" rx="35" ry="18" fill="#D67568" opacity="0.35" transform="rotate(-15 485 510)"/>
      <ellipse cx="715" cy="510" rx="35" ry="18" fill="#D67568" opacity="0.35" transform="rotate(15 715 510)"/>

      <!-- Royal Bridal Crimson Matte Lips -->
      <path d="M 555,560 Q 600,540 645,560 Q 600,590 555,560 Z" fill="#911D25" stroke="#660E14" stroke-width="2"/>
      <path d="M 585,558 Q 600,550 615,558" stroke="#F2D89C" stroke-width="1.5" fill="none" opacity="0.6"/>

      <!-- Nose Ring Nath -->
      <circle cx="560" cy="505" r="22" fill="none" stroke="url(#goldGleam)" stroke-width="2.5"/>
      <path d="M 540,505 Q 480,480 435,420" stroke="url(#goldGleam)" stroke-width="2" stroke-dasharray="3 3" fill="none"/>

      <text x="600" y="80" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="34" fill="url(#goldGleam)" letter-spacing="4">
        ROYAL BRIDAL HD AIRBRUSH GLAM
      </text>
      <text x="600" y="115" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="14" fill="#E8CFC6" letter-spacing="3">
        TEMPTU SILICONE BASE · 18-HOUR WATERPROOF · ZERO FLASHBACK
      </text>
    </svg>
  `;

  // 3. Hair Before vs After
  const hairBeforeSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <radialGradient id="bgHairB" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#EFE8DE"/>
          <stop offset="100%" stop-color="#DCD0C0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bgHairB)"/>

      <!-- Untamed / frizzy dry hair strands -->
      <g stroke="#4A3B32" stroke-width="2" fill="none" opacity="0.8">
        <path d="M 600,200 C 450,230 350,380 340,650 C 330,750 320,850 310,900"/>
        <path d="M 600,200 C 750,230 850,380 860,650 C 870,750 880,850 890,900"/>
        <path d="M 520,300 C 420,400 370,550 380,800"/>
        <path d="M 680,300 C 780,400 830,550 820,800"/>
        <!-- Frizz flyaways -->
        <path d="M 360,450 Q 320,440 300,420" stroke-width="1.5"/>
        <path d="M 840,450 Q 880,440 900,420" stroke-width="1.5"/>
        <path d="M 370,600 Q 330,620 310,650" stroke-width="1.5"/>
        <path d="M 830,600 Q 870,620 890,650" stroke-width="1.5"/>
      </g>

      <text x="600" y="100" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="34" fill="#5A1E1B" letter-spacing="4">
        NATURAL TEXTURE BEFORE STYLING
      </text>
      <text x="600" y="140" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="14" fill="#7A5645" letter-spacing="3">
        UNTREATED HAIR · DULL ENDS &amp; FRIZZ PRIOR TO KERATIN THERAPY
      </text>
    </svg>
  `;

  const hairAfterSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <radialGradient id="bgHairA" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#211A18"/>
          <stop offset="100%" stop-color="#120E0D"/>
        </radialGradient>
        <linearGradient id="goldGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#543729"/>
          <stop offset="35%" stop-color="#B8893A"/>
          <stop offset="70%" stop-color="#DDAF62"/>
          <stop offset="100%" stop-color="#3A241A"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bgHairA)"/>

      <!-- Voluminous Glossy Hollywood Waves -->
      <g stroke="url(#goldGloss)" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 600,200 C 480,240 400,320 400,440 C 400,560 480,620 440,740 C 410,830 380,880 360,900"/>
        <path d="M 600,200 C 720,240 800,320 800,440 C 800,560 720,620 760,740 C 790,830 820,880 840,900"/>
        <path d="M 550,280 C 480,340 460,450 490,560 C 520,670 480,780 460,900" stroke-width="4.5"/>
        <path d="M 650,280 C 720,340 740,450 710,560 C 680,670 720,780 740,900" stroke-width="4.5"/>
      </g>

      <!-- Fresh White Jasmine & Pearl Hair Pins -->
      <g fill="#FFF9F0" stroke="#B8893A" stroke-width="1.5">
        <circle cx="580" cy="260" r="12"/>
        <circle cx="620" cy="260" r="12"/>
        <circle cx="600" cy="240" r="10"/>
        <circle cx="590" cy="280" r="9"/>
        <circle cx="610" cy="280" r="9"/>
        <!-- Pearls in braid -->
        <circle cx="480" cy="460" r="6" fill="#F7F1E6"/>
        <circle cx="720" cy="460" r="6" fill="#F7F1E6"/>
        <circle cx="450" cy="640" r="5" fill="#F7F1E6"/>
        <circle cx="750" cy="640" r="5" fill="#F7F1E6"/>
      </g>

      <text x="600" y="80" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="34" fill="#B8893A" letter-spacing="4">
        HONEY CARAMEL BALAYAGE &amp; RUSSIAN WAVES
      </text>
      <text x="600" y="115" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="14" fill="#E8CFC6" letter-spacing="3">
        KERATIN SILK INFUSION · MIRROR SHINE · BESPOKE FLORAL GAJRA PINS
      </text>
    </svg>
  `;

  await renderSvgToWebp('before-after-mehndi-fresh', mehndiFreshSvg);
  await renderSvgToWebp('before-after-mehndi-dark', mehndiDarkSvg);
  await renderSvgToWebp('before-after-makeup-bare', makeupBareSvg);
  await renderSvgToWebp('before-after-makeup-glam', makeupGlamSvg);
  await renderSvgToWebp('before-after-hair-before', hairBeforeSvg);
  await renderSvgToWebp('before-after-hair-after', hairAfterSvg);
}

// 2. Curated Gallery Works (WebP + tiny blur)
async function generateGalleryPlaceholders() {
  const items = [
    // Mehndi
    { name: 'gallery-bridal-1', title: 'Jodhpur Jharokha Bridal Palms', cat: 'Bridal Henna', color: '#5A1E1B', accent: '#B8893A' },
    { name: 'gallery-bridal-2', title: 'Sacred Lotus & Baraat Silhouette', cat: 'Bridal Henna', color: '#4A1412', accent: '#D4AF37' },
    { name: 'gallery-bridal-3', title: 'Royal Marwar Bridal Feet', cat: 'Bridal Henna', color: '#3A0E0C', accent: '#B8893A' },
    { name: 'gallery-bridal-4', title: 'Couple Monogram Hidden Palms', cat: 'Bridal Henna', color: '#521A18', accent: '#E8CFC6' },
    { name: 'gallery-arabic-1', title: 'Gulf Rose Negative Space Trail', cat: 'Arabic Flow', color: '#3F4A2A', accent: '#B8893A' },
    { name: 'gallery-arabic-2', title: 'Minimalist Henna Lace Glove', cat: 'Indo-Arabic', color: '#2F3820', accent: '#D9A876' },
    { name: 'gallery-arabic-3', title: 'Kashmiri Paisley Cuff', cat: 'Arabic Flow', color: '#44512E', accent: '#F7F1E6' },
    { name: 'gallery-engagement-1', title: 'Lotus Diamond Jaal Backhand', cat: 'Engagement Henna', color: '#5A1E1B', accent: '#B8893A' },
    { name: 'gallery-engagement-2', title: 'Delicate Roka Ceremony Backhand', cat: 'Engagement Henna', color: '#4C1816', accent: '#E8CFC6' },
    { name: 'gallery-babyshower-1', title: 'Auspicious Bell & Cradle Henna', cat: 'Baby Shower', color: '#6A2A27', accent: '#F2D89C' },
    { name: 'gallery-festive-1', title: 'Karwa Chauth Moon & Peacock', cat: 'Festive Henna', color: '#38100E', accent: '#B8893A' },
    { name: 'gallery-festive-2', title: 'Hariyali Teej Monsoon Jaal', cat: 'Festive Henna', color: '#3F4A2A', accent: '#B8893A' },
    { name: 'gallery-kids-1', title: 'Floral Butterfly Little Hands', cat: 'Kids Henna', color: '#7E3633', accent: '#E8CFC6' },
    { name: 'gallery-kids-2', title: 'Dainty Fairy & Twiglet Ring', cat: 'Kids Henna', color: '#5A1E1B', accent: '#D4AF37' },

    // Makeup
    { name: 'gallery-makeup-bridal-1', title: 'Royal Heritage HD Bridal Glam', cat: 'Bridal Makeup', color: '#3A100F', accent: '#B8893A' },
    { name: 'gallery-makeup-bridal-2', title: 'Temptu Airbrush Golden Goddess', cat: 'Airbrush Bridal', color: '#2E0B0A', accent: '#F2D89C' },
    { name: 'gallery-makeup-reception-1', title: 'Sultry Smokey Reception Eye Artistry', cat: 'Reception Glam', color: '#221F1C', accent: '#B8893A' },
    { name: 'gallery-makeup-reception-2', title: 'Rose Gold Shimmer Engagement Glow', cat: 'Engagement Glam', color: '#4C1D2A', accent: '#E8CFC6' },
    { name: 'gallery-makeup-party-1', title: 'Sangeet Bridesmaid Soft Radiance', cat: 'Party Makeup', color: '#562524', accent: '#DDAF62' },
    { name: 'gallery-makeup-party-2', title: 'Haldi Dewy Floral Glow', cat: 'Party Makeup', color: '#6E4515', accent: '#F5DEB3' },
    { name: 'gallery-makeup-hair-1', title: 'Royal Floral Gajra Bridal Bun', cat: 'Hairstyling', color: '#261D1A', accent: '#B8893A' },
    { name: 'gallery-makeup-hair-2', title: 'Textured Russian Mermaid Braid', cat: 'Hairstyling', color: '#1F1816', accent: '#E8CFC6' },

    // Parlour
    { name: 'gallery-parlour-skin-1', title: '24K Gold Illumination Bridal Facial', cat: 'Skin Atelier', color: '#2A1E12', accent: '#D4AF37' },
    { name: 'gallery-parlour-skin-2', title: 'O3+ Oxy-D-Tan & Brightening Peel', cat: 'Skin Atelier', color: '#1B261D', accent: '#B8893A' },
    { name: 'gallery-parlour-hair-1', title: 'Honey Caramel Balayage & Blowout', cat: 'Hair Rituals', color: '#291811', accent: '#DDAF62' },
    { name: 'gallery-parlour-hair-2', title: 'Moroccan Oil Keratin Smoothing Therapy', cat: 'Hair Rituals', color: '#1A1412', accent: '#B8893A' },
    { name: 'gallery-parlour-nails-1', title: 'Bridal French Ombre Acrylics', cat: 'Nail Studio', color: '#3E1C22', accent: '#E8CFC6' },
    { name: 'gallery-parlour-nails-2', title: 'Burgundy Velvet Gel Manicure', cat: 'Nail Studio', color: '#48131B', accent: '#B8893A' },
    { name: 'gallery-parlour-studio-1', title: 'The Kashish Private Bridal Suite', cat: 'Studio Atelier', color: '#221B19', accent: '#B8893A' },
    { name: 'gallery-parlour-studio-2', title: 'Herbal Steam & Hair Spa Sanctuary', cat: 'Studio Atelier', color: '#1A2118', accent: '#A0B286' },
  ];

  for (const item of items) {
    const safeTitle = item.title.replace(/&/g, '&amp;');
    const safeCat = item.cat.replace(/&/g, '&amp;');

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
        <defs>
          <radialGradient id="grad-${item.name}" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stop-color="${item.color}"/>
            <stop offset="100%" stop-color="#140D0C"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="900" fill="url(#grad-${item.name})"/>
        
        <!-- Ornate border frame -->
        <rect x="50" y="50" width="1100" height="800" fill="none" stroke="${item.accent}" stroke-width="1.5" stroke-opacity="0.5"/>
        <rect x="70" y="70" width="1060" height="760" fill="none" stroke="${item.accent}" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="6 4"/>
        
        <!-- Corner flourishes -->
        <path d="M 50,110 L 110,50 M 50,130 L 130,50" stroke="${item.accent}" stroke-width="1.5" stroke-opacity="0.6"/>
        <path d="M 1150,110 L 1090,50 M 1150,130 L 1070,50" stroke="${item.accent}" stroke-width="1.5" stroke-opacity="0.6"/>
        <path d="M 50,790 L 110,850 M 50,770 L 130,850" stroke="${item.accent}" stroke-width="1.5" stroke-opacity="0.6"/>
        <path d="M 1150,790 L 1090,850 M 1150,770 L 1070,850" stroke="${item.accent}" stroke-width="1.5" stroke-opacity="0.6"/>

        <!-- Center Mandala motif -->
        <g stroke="${item.accent}" stroke-width="2" fill="none" opacity="0.35" transform="translate(600,420)">
          <circle r="120"/>
          <circle r="90" stroke-dasharray="6 6"/>
          <circle r="60"/>
          <circle r="30"/>
          <path d="M 0,-120 L 0,120 M -120,0 L 120,0"/>
          <path d="M -85,-85 L 85,85 M -85,85 L 85,-85"/>
        </g>

        <!-- Category & Title -->
        <text x="600" y="320" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="${item.accent}" letter-spacing="6">
          ✦ ${safeCat.toUpperCase()} ✦
        </text>
        <text x="600" y="440" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="44" fill="#F7F1E6" font-weight="normal">
          ${safeTitle}
        </text>
        <text x="600" y="500" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#C9A193" letter-spacing="3">
          KASHISH MEHNDI &amp; MAKEUP STUDIO · NEW DELHI
        </text>
      </svg>
    `;

    await renderSvgToWebp(item.name, svg);
  }
}

async function main() {
  console.log('Generating Before/After and Gallery WebP assets...');
  await generateBeforeAfter();
  await generateGalleryPlaceholders();
  console.log('All WebP and blur placeholder assets generated successfully!');
}

main().catch(console.error);
