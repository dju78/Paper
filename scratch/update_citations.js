const fs = require('fs');
const path = require('path');

const pubDir = path.join(__dirname, '../content/publications');

const files = fs.readdirSync(pubDir).filter(f => f.endsWith('.md'));

let changedFiles = 0;

for (const file of files) {
  const filePath = path.join(pubDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace APA citation
  content = content.replace(/Daramola, J\.O\./g, 'DJ Omoyele');
  content = content.replace(/Daramola, J\.O/g, 'DJ Omoyele');
  
  // Replace BibTeX citation
  content = content.replace(/author=\{Daramola, Joseph Omoyele\}/g, 'author={DJ Omoyele}');
  content = content.replace(/author=\{Daramola, J\.O\.\}/g, 'author={DJ Omoyele}');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    changedFiles++;
  }
}

console.log(`Updated citations in ${changedFiles} files.`);
