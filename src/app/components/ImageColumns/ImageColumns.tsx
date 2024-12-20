import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './ImageColumns.css';

interface ImageColumnsProps {
  type: string;
  images: string[];
  onImageClick: (image: string) => void; // Callback prop for parent notification
}

const ImageColumns: React.FC<ImageColumnsProps> = ({ type, images, onImageClick }) => {
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);

  const handleImageClick = (imageName: string, imagePath: string) => {
    setSelectedImageName(imageName); // Always update the selected image
    onImageClick(imagePath); // Notify parent of the selected image

    const similarImages = getSimilarImages(imageName); // Get similar images
    if (similarImages.length === 0) {
      return; // If no similar images, do not show "more options"
    }
  };
  
  const handleGoBack = () => {
    setSelectedImageName(null); // Reset the selected image to go back to the initial state
  };
  
  const images_ = images.map((img) => img.replace(/\\/g, '/')); // Normalize paths
  const numColumns = 3; // Consistent number of columns for layout
  
  useEffect(() => {
    if (images_.length > 0 && !selectedImageName) {
      const firstImage = images_[0];
      const firstImageName = firstImage.split('/').pop()?.split('.')[0] || '';
      setSelectedImageName(firstImageName);
      onImageClick(firstImage); // Trigger parent callback
    }
  }, [images_, selectedImageName, onImageClick]);
  // Define filtering logic based on the type
  const getFilteredImages = () => {
    if (type === 'Skin') {
      return images_.filter((img) => img.includes('base')); // Filter specific images for skins
    } else if (type === 'icon') {
      return images_.filter((img) => img.endsWith('.webp')); // Filter `.webp` images for icons
    } 
    return images_; // Default: return all images if no type-specific filtering is defined
  };

  const getSimilarImages = (imageName: string | null = selectedImageName) => {
    if (!imageName) return [];
    if (type === 'Skin') {
      return images_.filter((img) =>
        img.includes(`assets/images/png/skins/${imageName}`)
      );
    } else if (type === 'icon') {
      return images_.filter((img) =>
        img.includes(`assets/images/png/icons/${imageName}`)
      );
    } else if (type === 'more') {
      return images_.filter((img) => img.includes(imageName));
    } else if (type === 'hechizos') {
      return images_.filter((img) => img.includes(imageName));
    }
    return [];
  };

  const filteredImages = getFilteredImages(); // Filtered images based on the type
  const similarImages = selectedImageName ? getSimilarImages() : []; // Get similar images if an image is selected
  const imagesToDisplay = similarImages.length > 0 ? similarImages : filteredImages; // Show similar images if available, otherwise initial images

  const imagesPerColumn = Math.ceil(imagesToDisplay.length / numColumns);

  return (
    <div className="image-container">
      {selectedImageName && similarImages.length > 0 && (
        <div className="go-back-container">
          <button className="go-back-button" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      )}
      <div className="columns">
        {[...Array(numColumns)].map((_, columnIndex) => (
          <div key={columnIndex} className="image-column">
            {imagesToDisplay
              .slice(columnIndex * imagesPerColumn, (columnIndex + 1) * imagesPerColumn)
              .map((img, index) => {
                const imageName =
                  img.split('assets/images/png/skins/').pop()?.split('/skins/')[0] || // Skin name extraction
                  img.split('assets/images/png/icons/').pop()?.split('/icons/')[0] || // Icon name extraction
                  '';

                return (
                  <div
                    key={index}
                    className="image"
                    style={{
                      border: selectedImageName === imageName ? '2px solid red' : 'none',
                    }}
                    onClick={() => handleImageClick(imageName, img)} // Pass image path to parent
                  >
                    <Image
                      src={'/' + img}
                      alt={imageName}
                      width={100}
                      height={100}
                    />
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageColumns;
