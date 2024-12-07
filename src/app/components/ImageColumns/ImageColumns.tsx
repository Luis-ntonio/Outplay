import React from 'react';
import './ImageColumns.css';
import { useState } from 'react';

interface ImageColumnsProps {
  type: string;
  images: string[];
}


const ImageColumns: React.FC<ImageColumnsProps> = ({ type, images }) => {
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);

  const handleImageClick = (imageName: string) => {
    setSelectedImageName(imageName);
  };

  if (type === 'skin') {
    // Calculate number of images per column
    const images_ = images.map(img => img.replace(/\\/g, '/'));
    const filteredImages = images_.filter(img => img.includes('base'));
    const numColumns = 3;
    const imagesPerColumn = Math.ceil(filteredImages.length / numColumns);

    let similarImages: string[] = [];
    if (selectedImageName) {
      
      similarImages = images_.filter(img => img.includes("assets/images/png/skins/" + selectedImageName));
      let imagesPerColumn_ = Math.ceil(similarImages.length / numColumns);
      return (
        <div className="image-container">
          {[...Array(numColumns)].map((_, columnIndex) => (
            <div key={columnIndex} className="image-column">
            {similarImages.slice(columnIndex * imagesPerColumn_, (columnIndex + 1) * imagesPerColumn_).map((img, index) => {
              let imageName = img.split('assets/images/png/skins/').pop() || '';
              imageName = imageName.split('/skins/')[0];
              return (
                <div
                  key={index}
                  className="image"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'contain',
                    border: selectedImageName === imageName ? '2px solid red' : 'none'
                  }}
                >
                  <img src={img} alt={imageName} />
                </div>
              );
            })}
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="image-container">
        {[...Array(numColumns)].map((_, columnIndex) => (
          <div key={columnIndex} className="image-column">
          {filteredImages.slice(columnIndex * imagesPerColumn, (columnIndex + 1) * imagesPerColumn).map((img, index) => {
            let imageName = img.split('assets/images/png/skins/').pop() || '';
            imageName = imageName.split('/skins/')[0];
            return (
              <div
                key={index}
                className="image"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'contain',
                  border: selectedImageName === imageName ? '2px solid red' : 'none'
                }}
                onClick={() => handleImageClick(imageName)}
              >
                <img src={img} alt={imageName} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

return null;
};

export default ImageColumns;
