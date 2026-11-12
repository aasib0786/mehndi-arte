const fs = require('fs');
const path = require('path');

const publicImages = path.join(__dirname, '..', 'public', 'images');

// 1. Ensure about-* and hero-* aliases exist as real photos
const copies = [
  { src: 'gallery-bridal-1.webp', dest: 'about-mehndi.webp' },
  { src: 'gallery-bridal-1-blur.webp', dest: 'about-mehndi-blur.webp' },
  { src: 'gallery-makeup-bridal-1.webp', dest: 'about-makeup.webp' },
  { src: 'gallery-makeup-bridal-1-blur.webp', dest: 'about-makeup-blur.webp' },
  { src: 'gallery-parlour-studio-1.webp', dest: 'about-studio.webp' },
  { src: 'gallery-parlour-studio-1-blur.webp', dest: 'about-studio-blur.webp' },
  { src: 'hero-1.webp', dest: 'hero-mehndi.webp' },
  { src: 'hero-1-blur.webp', dest: 'hero-mehndi-blur.webp' },
  { src: 'hero-2.webp', dest: 'hero-makeup.webp' },
  { src: 'hero-2-blur.webp', dest: 'hero-makeup-blur.webp' },
  { src: 'hero-3.webp', dest: 'hero-salon.webp' },
  { src: 'hero-3-blur.webp', dest: 'hero-salon-blur.webp' },
  { src: 'gallery-bridal-1.webp', dest: 'service-bridal.webp' },
  { src: 'gallery-engagement-1.webp', dest: 'service-engagement.webp' },
  { src: 'gallery-arabic-1.webp', dest: 'service-sangeet.webp' },
  { src: 'gallery-arabic-2.webp', dest: 'service-arabic.webp' },
  { src: 'gallery-bridal-3.webp', dest: 'service-indo-arabic.webp' },
];

copies.forEach(({ src, dest }) => {
  const srcPath = path.join(publicImages, src);
  const destPath = path.join(publicImages, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`Source missing: ${src}`);
  }
});

console.log('Real image assets synchronized!');

