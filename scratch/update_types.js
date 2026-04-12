const fs = require('fs');
const path = require('path');
const dir = 'content/publications';
const files = fs.readdirSync(dir);
files.forEach(file => {
    if(!file.endsWith('.md')) return;
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/type: "Journal Article"/g, 'type: "Journal Articles"');
    content = content.replace(/type: "Working Paper"/g, 'type: "Working Papers / Preprints"');
    content = content.replace(/type: "Policy Paper"/g, 'type: "Working Papers / Preprints"');
    content = content.replace(/type: "Book"/g, 'type: "Books / Handbooks"');
    content = content.replace(/type: "Article"/g, 'type: "Articles & Essays"');
    fs.writeFileSync(p, content);
});
console.log('Types updated.');
