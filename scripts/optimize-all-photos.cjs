const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');

async function optimizeAll() {
  console.log('=== REAL PHOTOS OPTIMIZATION & PLACEHOLDER PIPELINE ===');
  console.log('Target: Max 1600px width, WebP Quality 80, Small Blurred Placeholders\n');

  // 1. Process Best Hero Photos first from the best photos in each category:
  // - Best Mehndi: gallery-bridal-1.webp
  // - Best Bridal Makeup: gallery-makeup-bridal-1.webp
  // - Best Studio: gallery-parlour-studio-1.webp
  console.log('1. Generating Best Hero Collage & Three Services Photos...');

  const heroMappings = [
    { src: 'gallery-bridal-1.webp', dest: 'hero-1.webp', blurDest: 'hero-1-blur.webp' },
    { src: 'gallery-makeup-bridal-1.webp', dest: 'hero-2.webp', blurDest: 'hero-2-blur.webp' },
    { src: 'gallery-parlour-studio-1.webp', dest: 'hero-3.webp', blurDest: 'hero-3-blur.webp' },
  ];

  for (const m of heroMappings) {
    const srcPath = path.join(IMAGES_DIR, m.src);
    const destPath = path.join(IMAGES_DIR, m.dest);
    const blurPath = path.join(IMAGES_DIR, m.blurDest);

    if (fs.existsSync(srcPath)) {
      // Full resolution (up to 1600px, Q80)
      await sharp(srcPath)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(destPath);

      // Blur placeholder (32px, blur 2.5, Q30)
      await sharp(srcPath)
        .rotate()
        .resize(32)
        .blur(2.5)
        .webp({ quality: 30 })
        .toFile(blurPath);

      console.log(`  ✓ Created ${m.dest} (from ${m.src}) & ${m.blurDest}`);
    }
  }

  // 2. Scan and optimize all primary photos in public/images/
  console.log('\n2. Optimizing all gallery, before-after, and service photos...');
  const files = fs.readdirSync(IMAGES_DIR);
  const primaryImages = files.filter(
    (f) =>
      !f.includes('-blur') &&
      !f.includes('-placeholder') &&
      (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) &&
      f !== 'README.md'
  );

  console.log(`Found ${primaryImages.length} primary photos to optimize.\n`);

  for (let i = 0; i < primaryImages.length; i++) {
    const filename = primaryImages[i];
    const filePath = path.join(IMAGES_DIR, filename);
    const baseName = path.basename(filename, path.extname(filename));
    const targetWebpName = `${baseName}.webp`;
    const targetWebpPath = path.join(IMAGES_DIR, targetWebpName);
    const targetBlurName = `${baseName}-blur.webp`;
    const targetBlurPath = path.join(IMAGES_DIR, targetBlurName);

    try {
      const buffer = fs.readFileSync(filePath);

      // Re-encode main image to max 1600px width at quality 80
      const optimizedBuffer = await sharp(buffer)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80, effort: 5 })
        .toBuffer();

      fs.writeFileSync(targetWebpPath, optimizedBuffer);

      // Generate small blurred placeholder (32px width, blur 2.5)
      const blurBuffer = await sharp(buffer)
        .rotate()
        .resize(32)
        .blur(2.5)
        .webp({ quality: 30 })
        .toBuffer();

      fs.writeFileSync(targetBlurPath, blurBuffer);

      process.stdout.write(`[${i + 1}/${primaryImages.length}] Optimized: ${targetWebpName} + ${targetBlurName}\n`);
    } catch (err) {
      console.error(`Error on ${filename}:`, err.message);
    }
  }

  console.log('\n=== ALL REAL PHOTOS PROCESSED SUCCESSFULLY ===');
}

optimizeAll().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});

