const fs = require('fs');
const path = require('path');

// 1. Update publication content files
const pubDir = path.join(__dirname, '../content/publications');
const files = fs.readdirSync(pubDir).filter(f => f.endsWith('.md'));
let changes = [];

for (const file of files) {
  const filePath = path.join(pubDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace APA citations: "Daramola, J.O." and "Daramola, J.O"
  content = content.replace(/Daramola, J\.O\./g, 'D.J. Omoyele');
  content = content.replace(/Daramola, J\.O/g, 'D.J. Omoyele');

  // Replace BibTeX author fields
  content = content.replace(/author=\{Daramola, Joseph Omoyele\}/g, 'author={D.J. Omoyele}');
  content = content.replace(/author=\{Daramola, J\.O\.\}/g, 'author={D.J. Omoyele}');

  // Replace frontmatter author field
  content = content.replace(/author: "Daramola Joseph Omoyele"/g, 'author: "D.J. Omoyele"');

  // Replace BibTeX keys like daramola2026
  content = content.replace(/\{daramola(\d{4})/g, '{djomoyele$1');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    changes.push('content/publications/' + file);
  }
}

// 2. Update TSX source files
const srcFiles = [
  path.join(__dirname, '../src/app/page.tsx'),
  path.join(__dirname, '../src/app/layout.tsx'),
  path.join(__dirname, '../src/app/[slug]/page.tsx'),
  path.join(__dirname, '../src/app/about/page.tsx'),
];

for (const filePath of srcFiles) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  content = content.replace(/Daramola Joseph Omoyele/g, 'D.J. Omoyele');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    changes.push(path.relative(path.join(__dirname, '..'), filePath));
  }
}

// 3. Update admin HTML
const adminHtml = path.join(__dirname, '../public/admin/index.html');
if (fs.existsSync(adminHtml)) {
  let content = fs.readFileSync(adminHtml, 'utf8');
  let originalContent = content;
  content = content.replace(/Daramola Joseph Omoyele/g, 'D.J. Omoyele');
  if (content !== originalContent) {
    fs.writeFileSync(adminHtml, content, 'utf8');
    changes.push('public/admin/index.html');
  }
}

console.log('--- CHANGES MADE ---');
changes.forEach(f => console.log('  Updated: ' + f));
console.log('Total files updated: ' + changes.length);
