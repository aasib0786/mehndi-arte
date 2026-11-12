const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const GALLERY_DATA_FILE = path.resolve(__dirname, '../src/data/gallery.ts');

const VALID_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff']);

// Category keywords for intelligent auto-tagging
function detectCategory(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('arabic') || lower.includes('indo') || lower.includes('negative')) return 'arabic';
  if (lower.includes('engage') || lower.includes('roka') || lower.includes('ring')) return 'engagement';
  if (lower.includes('baby') || lower.includes('shower') || lower.includes('godh')) return 'babyshower';
  if (lower.includes('festive') || lower.includes('karwa') || lower.includes('teej') || lower.includes('diwali')) return 'festive';
  if (lower.includes('kid') || lower.includes('child')) return 'kids';
  return 'bridal'; // default & flagship commission
}

function formatTitle(name, category, index) {
  const clean = name
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (clean.length > 5 && !clean.toLowerCase().includes('image') && !clean.toLowerCase().includes('whatsapp') && !clean.toLowerCase().includes('img')) {
    return clean;
  }

  const categoryTitles = {
    bridal: [
      'The Royal Jharokha Bridal Palms',
      'Heirloom Baraat Procession Sleeves',
      'Sacred Lotus & Peacock Bridal Jaal',
      'Intimate Radha-Krishna Couple Portraiture',
      'Architectural Arches & Fine Net Forearms',
      'Heritage Marwar Bridal Feet Henna',
    ],
    arabic: [
      'Modern Minimalist Negative-Space Foliage',
      'Airy Floral Vine Wrist Glove Illusion',
      'Indo-Arabic Shaded Mandala Palms',
      'Contemporary Flowing Bel & Leaf Symmetry',
    ],
    engagement: [
      'Delicate Ring-Focus Mandala Medallion',
      'Geometric Diamond Jaal Engagement Henna',
      'Soft Symmetrical Backhand Lace Mesh',
    ],
    babyshower: [
      'Whimsical Floral Bells & Cradle Motifs',
      'Auspicious Bloom Maternity Hand Adornment',
    ],
    festive: [
      'Traditional Karwa Chauth Chand-Chakor Motif',
      'Intricate Teej Peacock & Paisley Roundels',
    ],
    kids: [
      'Playful Butterfly & Flower Wristband',
      'Dainty Twiglet Finger Adornment for Kids',
    ],
  };

  const pool = categoryTitles[category] || categoryTitles.bridal;
  return pool[index % pool.length];
}

function generateAltText(title, category) {
  const categoryKeywords = {
    bridal: 'luxury bespoke bridal mehndi hand design created with 100% organic Sojat henna by Master Artist Kashish in Delhi NCR',
    arabic: 'modern Arabic henna tattoo with negative space floral motifs and shading',
    engagement: 'elegant engagement mehndi design with delicate backhand symmetry and ring highlight',
    babyshower: 'auspicious baby shower maternity henna design with floral vines and blessings',
    festive: 'traditional festive mehndi design with deep stain for Karwa Chauth and Teej',
    kids: 'gentle chemical-free organic henna design for children and young girls',
  };

  return `${title} - ${categoryKeywords[category] || categoryKeywords.bridal}`;
}

async function processImages() {
  console.log('--- KASHISH MEHNDI ART: IMAGE PROCESSING PIPELINE ---');
  console.log(`Scanning: ${IMAGES_DIR}`);

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const allFiles = fs.readdirSync(IMAGES_DIR);
  const rawImages = allFiles.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    const isExcluded = f.includes('-blur') || f.includes('-placeholder') || f.startsWith('hero-') || f === 'README.md';
    return VALID_EXTENSIONS.has(ext) && !isExcluded;
  });

  console.log(`Found ${rawImages.length} incoming candidate image(s) to process.\n`);

  if (rawImages.length === 0) {
    console.log('Notice: No new raw images found in public/images/.');
    console.log('Drop your photos (JPG, PNG, HEIC, WEBP) into public/images/ and re-run:');
    console.log('  npm run process-images\n');
    return;
  }

  const processedItems = [];

  for (let i = 0; i < rawImages.length; i++) {
    const file = rawImages[i];
    const inputPath = path.join(IMAGES_DIR, file);
    const baseName = path.basename(file, path.extname(file)).toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const outputWebpName = `${baseName}.webp`;
    const outputPath = path.join(IMAGES_DIR, outputWebpName);
    const blurWebpName = `${baseName}-blur.webp`;
    const blurPath = path.join(IMAGES_DIR, blurWebpName);

    console.log(`[${i + 1}/${rawImages.length}] Processing: ${file}`);

    try {
      // 1. Convert to optimized WebP (max 1600px width, quality 80)
      const imageInstance = sharp(inputPath);
      const metadata = await imageInstance.metadata();

      await imageInstance
        .rotate() // auto-orient from EXIF
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);

      console.log(`  ✓ Optimized WebP: ${outputWebpName} (Max 1600px, Q80)`);

      // 2. Generate small blurred placeholder (24px width, blur 3)
      await sharp(inputPath)
        .rotate()
        .resize(24)
        .blur(2)
        .webp({ quality: 30 })
        .toFile(blurPath);

      console.log(`  ✓ Blurred Placeholder: ${blurWebpName}`);

      // Determine aspect ratio
      const width = metadata.width || 1000;
      const height = metadata.height || 1000;
      let aspectRatio = 'portrait';
      if (width > height * 1.15) aspectRatio = 'landscape';
      else if (Math.abs(width - height) < width * 0.15) aspectRatio = 'square';

      const category = detectCategory(baseName);
      const title = formatTitle(baseName, category, i);
      const altText = generateAltText(title, category);

      processedItems.push({
        id: `real-photo-${i + 1}`,
        title,
        altText,
        category,
        categoryLabel: category.charAt(0).toUpperCase() + category.slice(1),
        brideName: 'Bespoke Commission',
        venueOrCity: 'Delhi NCR Atelier Visit',
        image: `/images/${outputWebpName}`,
        placeholder: `/images/${blurWebpName}`,
        aspectRatio,
        stainTone: 'Deep Mahogany (48h Oxidation)',
        year: '2026',
        storyNote: `Authentic triple-sifted organic Sojat henna application by Master Artist Kashish. Guaranteed chemical-free with rich dark oxidation.`,
      });
    } catch (err) {
      console.error(`  ✗ Error processing ${file}:`, err.message);
    }
  }

  // 3. Assign the best 3 photos for hero parallax
  if (processedItems.length >= 3) {
    console.log('\nAssigning best 3 photos for hero parallax collage...');
    for (let h = 0; h < 3; h++) {
      const srcFile = path.join(IMAGES_DIR, path.basename(processedItems[h].image));
      const heroDest = path.join(IMAGES_DIR, `hero-${h + 1}.webp`);
      fs.copyFileSync(srcFile, heroDest);
      console.log(`  ✓ Copied ${processedItems[h].image} -> /images/hero-${h + 1}.webp`);
    }
  } else if (processedItems.length > 0) {
    // If fewer than 3, replicate the available ones for hero-1, hero-2, hero-3
    for (let h = 0; h < 3; h++) {
      const item = processedItems[h % processedItems.length];
      const srcFile = path.join(IMAGES_DIR, path.basename(item.image));
      const heroDest = path.join(IMAGES_DIR, `hero-${h + 1}.webp`);
      fs.copyFileSync(srcFile, heroDest);
      console.log(`  ✓ Copied ${item.image} -> /images/hero-${h + 1}.webp`);
    }
  }

  console.log(`\nSuccessfully processed ${processedItems.length} photos!`);
  return processedItems;
}

if (require.main === module) {
  processImages().catch((e) => {
    console.error('Fatal processing error:', e);
    process.exit(1);
  });
}

module.exports = { processImages };

