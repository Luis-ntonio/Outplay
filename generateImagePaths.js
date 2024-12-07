const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'public', "assets", "images", "png", 'skins');
console.log(__dirname);
const outputPath = path.join(__dirname, 'imagePaths.ts');


fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    // Filter out files if necessary and create path array
    const paths = [];
    const scanDirectory = (dirPath) => {
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            const isDirectory = fs.statSync(filePath).isDirectory();
            if (isDirectory) {
                scanDirectory(filePath); // Recursively scan subdirectories
            } else if (/(\d+|screen)\.(jpg|jpeg|png|gif|webp)$/.test(file)) {
                const relativePath = path.relative(__dirname + "\\public", filePath);
                paths.push(relativePath);
            }
        });
    };
    scanDirectory(directoryPath);

    // Create file content
    const content = `export const imagePaths: string[] = ${JSON.stringify(paths)};`;

    // Write to file
    fs.writeFile(outputPath, content, (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('File written successfully:', outputPath);
        }
    });
});
