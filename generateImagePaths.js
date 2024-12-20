const fs = require('fs');
const path = require('path');

const skinsDirectoryPath = path.join(__dirname, 'public', 'assets', 'images', 'png', 'skins');
const iconsDirectoryPath = path.join(__dirname, 'public', 'assets', 'Outplay', 'iconos');
const runasDirectoryPath1 = path.join(__dirname, 'public', 'assets', 'Outplay', 'OTROS', 'RUNA_1');
const runasDirectoryPath2 = path.join(__dirname, 'public', 'assets', 'Outplay', 'OTROS', 'RUNA_2');
const hechizosDirectoryPath1 = path.join(__dirname, 'public', 'assets', 'Outplay', 'OTROS', 'HECHIZO_1');
const hechizosDirectoryPath2 = path.join(__dirname, 'public', 'assets', 'Outplay', 'OTROS', 'HECHIZO_2');
const MarcosDirectoryPath = path.join(__dirname, 'public', 'assets', 'Outplay', 'NORMAL', 'MARCOS');
const BordesDirectoryPath = path.join(__dirname, 'public', 'assets', 'Outplay', 'NORMAL', 'BORDES');
const outputPath = path.join(__dirname, 'imagePaths.ts');

// Arrays to store paths
const skinsPaths = [];
const runasPaths1 = [];
const runasPaths2 = [];
const iconsPaths = [];
const hechizosPaths1 = [];
const hechizosPaths2 = [];
const bordesPaths = [];
const marcosPaths = [];

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
scanDirectory(runasDirectoryPath1, runasPaths1);
scanDirectory(runasDirectoryPath2, runasPaths2);
scanDirectory(hechizosDirectoryPath1, hechizosPaths1);
scanDirectory(hechizosDirectoryPath2, hechizosPaths2);
scanDirectory(MarcosDirectoryPath, marcosPaths);
scanDirectory(BordesDirectoryPath, bordesPaths);

// Create file content
const content = `
export const skins: string[] = ${JSON.stringify(skinsPaths, null, 2)};
export const icons_: string[] = ${JSON.stringify(iconsPaths, null, 2)};
export const runas1: string[] = ${JSON.stringify(runasPaths1, null, 2)};
export const runas2: string[] = ${JSON.stringify(runasPaths2, null, 2)};
export const hechizos1: string[] = ${JSON.stringify(hechizosPaths1, null, 2)};
export const hechizos2: string[] = ${JSON.stringify(hechizosPaths2, null, 2)};
export const bordes: string[] = ${JSON.stringify(bordesPaths, null, 2)};
export const marcos: string[] = ${JSON.stringify(marcosPaths, null, 2)};
`;

// Write to file
fs.writeFile(outputPath, content, (err) => {
  if (err) {
    console.log('Error writing file:', err);
  } else {
    console.log('File written successfully:', outputPath);
  }
});
