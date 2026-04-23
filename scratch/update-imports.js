const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../frontend/src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(srcDir, (filePath) => {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // App.jsx
    if (filePath.endsWith('App.jsx')) {
      content = content.replace(/\.\/components\/auth\//g, './pages/auth/');
      content = content.replace(/\.\/components\/sections\//g, './components/landing/sections/');
    }

    // DashboardPage.jsx
    if (filePath.endsWith('DashboardPage.jsx')) {
      content = content.replace(/\.\.\/components\/(.*?)Tab(\.jsx)?/g, '../components/dashboard/tabs/$1Tab$2');
      content = content.replace(/\.\.\/components\/Sidebar/g, '../components/dashboard/layout/Sidebar');
      content = content.replace(/\.\.\/components\/TopBar/g, '../components/dashboard/layout/TopBar');
      content = content.replace(/\.\/DashboardStyles/g, '../components/dashboard/DashboardStyles');
    }

    // Tabs and Layout components in dashboard
    if (filePath.includes('dashboard\\tabs') || filePath.includes('dashboard/tabs') || 
        filePath.includes('dashboard\\layout') || filePath.includes('dashboard/layout')) {
      content = content.replace(/\.\.\/pages\/DashboardStyles/g, '../DashboardStyles');
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
