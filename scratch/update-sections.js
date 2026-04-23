const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, '../frontend/src/components/landing/sections');

fs.readdirSync(sectionsDir).forEach(f => {
  const filePath = path.join(sectionsDir, f);
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // ../assets -> ../../../assets
    content = content.replace(/\.\.\/assets/g, '../../../assets');
    // ../ui -> ../../ui
    content = content.replace(/\.\.\/ui/g, '../../ui');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
