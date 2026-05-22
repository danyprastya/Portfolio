const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '..', 'public', 'projects');

async function convertToWebP() {
  const files = fs.readdirSync(projectsDir);
  const pngFiles = files.filter(f => f.endsWith('.png'));
  
  console.log(`Found ${pngFiles.length} PNG files to convert`);
  
  for (const file of pngFiles) {
    const inputPath = path.join(projectsDir, file);
    const outputPath = path.join(projectsDir, file.replace('.png', '.webp'));
    
    const stats = fs.statSync(inputPath);
    
    await sharp(inputPath)
      .webp({ quality: 82 })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`${file} → ${file.replace('.png', '.webp')} | ${(stats.size/1024).toFixed(0)}KB → ${(newStats.size/1024).toFixed(0)}KB (${savings}% smaller)`);
  }
  
  console.log('\nDone! Update projects.json image paths from .png to .webp');
}

convertToWebP().catch(console.error);
