const fs = require('fs');
const path = require('path');

const skinsDirectoryPath = path.join(__dirname, 'public', 'assets', 'images', 'png', 'skins');
const iconsDirectoryPath = path.join(__dirname, 'public', 'assets', 'images', 'png', 'Champions');
const runasDirectoryPath = path.join(__dirname, 'public', 'assets', 'images', 'png', 'runas');
const hechizosDirectoryPath = path.join(__dirname, 'public', 'assets', 'images', 'png', 'hechizos de invocador');
const outputPath = path.join(__dirname, 'imagePaths.ts');

// Arrays to store paths
const skinsPaths = [];
const runasPaths = [];
const iconsPaths = [];
const hechizosPaths = [];

// Updated regular expression to detect all valid image files
const imageFileRegex = /\.(jpg|jpeg|png|gif|webp)$/i;

const scanDirectory = (dirPath, targetArray) => {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    if (isDirectory) {
      scanDirectory(filePath, targetArray); // Recursively scan subdirectories
    } else if (imageFileRegex.test(file)) { // Match any valid image file extension
      const relativePath = path.relative(path.join(__dirname, 'public'), filePath).replace(/\\/g, '/');
      targetArray.push(relativePath);
    }
  });
};

// Scan both skins and icons directories
scanDirectory(skinsDirectoryPath, skinsPaths);
scanDirectory(iconsDirectoryPath, iconsPaths);
scanDirectory(runasDirectoryPath, runasPaths);
scanDirectory(hechizosDirectoryPath, hechizosPaths);

// Create file content
const content = `
export const skins: string[] = ${JSON.stringify(skinsPaths, null, 2)};
export const icons_: string[] = ${JSON.stringify(iconsPaths, null, 2)};
export const runas: string[] = ${JSON.stringify(runasPaths, null, 2)};
export const hechizos: string[] = ${JSON.stringify(hechizosPaths, null, 2)};
`;

// Write to file
fs.writeFile(outputPath, content, (err) => {
  if (err) {
    console.log('Error writing file:', err);
  } else {
    console.log('File written successfully:', outputPath);
  }
});
