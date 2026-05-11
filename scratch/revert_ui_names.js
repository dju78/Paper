const fs = require('fs');
const path = require('path');

const srcFiles = [
  path.join(__dirname, '../src/app/page.tsx'),
  path.join(__dirname, '../src/app/layout.tsx'),
  path.join(__dirname, '../src/app/[slug]/page.tsx'),
  path.join(__dirname, '../src/app/about/page.tsx'),
  path.join(__dirname, '../public/admin/index.html')
];

let changes = [];

for (const filePath of srcFiles) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // We are reverting the UI changes: D.J. Omoyele -> Daramola Joseph Omoyele
  content = content.replace(/D\.J\. Omoyele/g, 'Daramola Joseph Omoyele');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    changes.push(path.relative(path.join(__dirname, '..'), filePath));
  }
}

console.log('--- REVERTED NAMES IN UI FILES ---');
changes.forEach(f => console.log('  Updated: ' + f));
console.log('Total files updated: ' + changes.length);
