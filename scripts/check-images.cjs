const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const srcFiles = getFiles('src');
const regex = /\/images\/[a-zA-Z0-9_\-\.]+\.(webp|jpg|jpeg|png|svg)/g;
const referenced = new Set();
const fileRefs = {};

srcFiles.forEach((f) => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    referenced.add(match[0]);
    if (!fileRefs[match[0]]) fileRefs[match[0]] = [];
    if (!fileRefs[match[0]].includes(f)) {
      fileRefs[match[0]].push(f);
    }
  }
});

console.log('Total referenced images:', referenced.size);
const missing = [];
referenced.forEach((img) => {
  const diskPath = path.join('public', img.replace(/^\//, ''));
  const exists = fs.existsSync(diskPath);
  if (!exists) {
    missing.push({ img, files: fileRefs[img] });
  }
});

console.log('Missing images count:', missing.length);
missing.forEach((m) => {
  console.log(`- ${m.img} (in ${m.files.join(', ')})`);
});

