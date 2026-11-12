const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Helper to convert Unsplash photo ID to direct CDN URL
const u = (id, w = 1200) => `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`;

// Direct image mappings for every single file in the app
const imageMap = {
  // --- HERO & CORE SERVICES ---
  'hero-1.webp': u('photo-1720798298994-bf41cb26ba31'),
  'hero-2.webp': u('photo-1742891603141-95b87334ce00'),
  'hero-3.webp': u('photo-1560066984-138dadb4c035'),
  'hero-mehndi.webp': u('photo-1720798298994-bf41cb26ba31'),
  'hero-makeup.webp': u('photo-1742891603141-95b87334ce00'),
  'hero-salon.webp': u('photo-1560066984-138dadb4c035'),
  'about-mehndi.webp': u('photo-1621607512214-68297480165e'),
  'about-makeup.webp': u('photo-1779253806297-24c0868cc36d'),
  'about-studio.webp': u('photo-1633681926022-84c23e8cb2d6'),

  // --- SERVICE SUMMARY SHORTCUTS ---
  'service-bridal.webp': u('photo-1720798298994-bf41cb26ba31'),
  'service-arabic.webp': u('photo-1583241800698-e8ab01830a07'),
  'service-engagement.webp': u('photo-1596704017254-9b121068fb31'),
  'service-indo-arabic.webp': u('photo-1610030469983-98e550d6193c'),
  'service-sangeet.webp': u('photo-1606800052052-a08af7148866'),

  // --- MEHNDI GALLERY ---
  'gallery-bridal-1.webp': u('photo-1720798298994-bf41cb26ba31'),
  'gallery-bridal-2.webp': u('photo-1732118400647-a81e3b37be87'),
  'gallery-bridal-3.webp': u('photo-1676134379048-8d3b7af12ce8'),
  'gallery-bridal-4.webp': 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Bridal_Mehndi_Design.jpg',
  'gallery-engagement-1.webp': u('photo-1596704017254-9b121068fb31'),
  'gallery-engagement-2.webp': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Latest_Mehndi_Design.jpg',
  'gallery-arabic-1.webp': u('photo-1583241800698-e8ab01830a07'),
  'gallery-arabic-2.webp': u('photo-1610030469983-98e550d6193c'),
  'gallery-arabic-3.webp': u('photo-1617627143750-d86bc21e42bb'),
  'gallery-festive-1.webp': u('photo-1606800052052-a08af7148866'),
  'gallery-festive-2.webp': u('photo-1621607512022-6aecc4fed814'),
  'gallery-babyshower-1.webp': 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Mehndi_decoration_on_back_side_of_hands.jpg',
  'gallery-kids-1.webp': u('photo-1609357605129-26f69add5d6e'),
  'gallery-kids-2.webp': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Front_and_back_hand_mehendi_design.jpg',

  // --- MAKEUP GALLERY ---
  'gallery-makeup-bridal-1.webp': u('photo-1742891603141-95b87334ce00'),
  'gallery-makeup-bridal-2.webp': u('photo-1779253806297-24c0868cc36d'),
  'gallery-makeup-reception-1.webp': u('photo-1742891600223-fb9527316d3f'),
  'gallery-makeup-reception-2.webp': u('photo-1595777457583-95e059d581b8'),
  'gallery-makeup-party-1.webp': u('photo-1509967419530-da38b4704bc6'),
  'gallery-makeup-party-2.webp': u('photo-1534528741775-53994a69daeb'),
  'gallery-makeup-hair-1.webp': u('photo-1519699047748-de8e457a634e'),
  'gallery-makeup-hair-2.webp': u('photo-1562322140-8baeececf3df'),

  // --- PARLOUR GALLERY ---
  'gallery-parlour-skin-1.webp': u('photo-1570172619644-dfd03ed5d881'),
  'gallery-parlour-skin-2.webp': u('photo-1540555700478-4be289fbecef'),
  'gallery-parlour-hair-1.webp': u('photo-1522337360788-8b13dee7a37e'),
  'gallery-parlour-hair-2.webp': u('photo-1527799820374-dcf8d9d4a388'),
  'gallery-parlour-nails-1.webp': u('photo-1604654894610-df63bc536371'),
  'gallery-parlour-nails-2.webp': u('photo-1595476108010-b4d1f102b1b1'),
  'gallery-parlour-studio-1.webp': u('photo-1560066984-138dadb4c035'),
  'gallery-parlour-studio-2.webp': u('photo-1633681926022-84c23e8cb2d6'),

  // --- BEFORE & AFTER ---
  'before-after-mehndi-fresh.webp': u('photo-1720798298994-bf41cb26ba31'),
  'before-after-mehndi-dark.webp': u('photo-1732118400647-a81e3b37be87'),
  'before-after-makeup-bare.webp': u('photo-1524504388940-b1c1722653e1'),
  'before-after-makeup-glam.webp': u('photo-1742891603141-95b87334ce00'),
  'before-after-hair-before.webp': u('photo-1527799820374-dcf8d9d4a388'),
  'before-after-hair-after.webp': u('photo-1519699047748-de8e457a634e'),

  // --- REELS & SOCIAL ---
  'reel-1.webp': u('photo-1621607512214-68297480165e'),
  'reel-2.webp': u('photo-1765881312316-a9dc81ba1065'),
  'reel-3.webp': u('photo-1583241801142-113b9f5bbde5'),
  'reel-4.webp': u('photo-1512496015851-a90fb38ba796'),
  'reel-5.webp': u('photo-1604654894610-df63bc536371'),
  'reel-6.webp': u('photo-1517841905240-472988babdf9'),

  // --- BRIDAL JOURNEY ---
  'journey-1.webp': u('photo-1512496015851-a90fb38ba796'),
  'journey-2.webp': u('photo-1570172619644-dfd03ed5d881'),
  'journey-3.webp': u('photo-1720798298994-bf41cb26ba31'),
  'journey-4.webp': u('photo-1742891603141-95b87334ce00'),
  'journey-5.webp': u('photo-1765881312316-a9dc81ba1065'),

  // --- PROFILE ---
  'kashish-profile.webp': u('photo-1534528741775-53994a69daeb', 800)
};

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const opts = {
      headers: {
        'User-Agent': 'KashishStudioApp/1.0 (kashish@example.com)'
      }
    };
    https.get(url, opts, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function processImage(filename, url, outDir) {
  const targetWebp = path.join(outDir, filename);
  const baseName = filename.replace(/\.webp$/, '');
  const blurWebp = path.join(outDir, `${baseName}-blur.webp`);

  console.log(`Downloading ${filename} from ${url.slice(0, 50)}...`);
  const buf = await downloadBuffer(url);

  // Main webp (responsive 1200px max, quality 80)
  await sharp(buf)
    .resize(1200, 1500, { fit: 'cover', position: 'center' })
    .webp({ quality: 80 })
    .toFile(targetWebp);

  // Blur placeholder (20px width, quality 20)
  await sharp(buf)
    .resize(20, 25, { fit: 'cover', position: 'center' })
    .webp({ quality: 20 })
    .toFile(blurWebp);

  // Special case: kashish-profile.jpg
  if (filename === 'kashish-profile.webp') {
    const targetJpg = path.join(outDir, 'kashish-profile.jpg');
    await sharp(buf)
      .resize(800, 1000, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 80 })
      .toFile(targetJpg);
  }

  const stat = fs.statSync(targetWebp);
  console.log(`✓ Saved ${filename} (${Math.round(stat.size / 1024)} KB)`);
}

async function run() {
  const outDir = path.resolve(__dirname, '../public/images');
  const entries = Object.entries(imageMap);
  console.log(`Starting real photography replacement for ${entries.length} items...`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < entries.length; i++) {
    const [filename, url] = entries[i];
    try {
      await processImage(filename, url, outDir);
      successCount++;
    } catch (err) {
      console.error(`✗ Error processing ${filename}:`, err.message);
      failCount++;
    }
  }

  console.log(`\nCompleted: ${successCount} successful, ${failCount} failed.`);
}

run();

