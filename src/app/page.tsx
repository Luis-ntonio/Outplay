'use client';
import React, { useState } from "react";
import GeneralBox from "./components/GeneralBox/GeneralBox";
import { skins, icons_, runas, hechizos } from "../../imagePaths";

let images: string[] = skins; // For skins
let iconImages: string[] = icons_; // For icons

let icons = [
  "/assets/images/png/icons/icon.svg",
  "/assets/images/png/icons/marcos.svg",
  "/assets/images/png/icons/border.svg",
  "/assets/images/png/icons/skin.svg",
  "/assets/images/png/icons/more.svg",
  "/assets/images/png/icons/hechizos.svg",
];

export default function Home() {
  const [expandedBox, setExpandedBox] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>({});

  const handleBoxClick = (boxId: string) => {
    setExpandedBox((prevBox) => (prevBox === boxId ? null : boxId));
  };

  const handleImageSelection = (boxId: string, imagePath: string) => {
    setSelectedImages((prev) => ({ ...prev, [boxId]: imagePath }));
  };

  const handleClearAll = () => {
    setSelectedImages({}); // Reset all selected images
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed-header">Welcome!</div>
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex bigcont">
        <div className="leftcont">
          <GeneralBox
            item="icon"
            images={iconImages}
            icons={icons}
            isExpanded={expandedBox === "icon"}
            onClick={() => handleBoxClick("icon")}
            onImageSelect={(imagePath) => handleImageSelection("icon", imagePath)}
          />
          <GeneralBox
            item="skin"
            images={images}
            icons={icons}
            isExpanded={expandedBox === "skin"}
            onClick={() => handleBoxClick("skin")}
            onImageSelect={(imagePath) => handleImageSelection("skin", imagePath)}
          />
          <GeneralBox
            item="more"
            images={runas}
            icons={icons}
            isExpanded={expandedBox === "more"}
            onClick={() => handleBoxClick("more")}
            onImageSelect={(imagePath) => handleImageSelection("more", imagePath)}
          />
        </div>
        <div className="preview">
          <button className="clear-all-button" onClick={handleClearAll}>
            Clear All
          </button>
          {Object.entries(selectedImages).length > 0 ? (
            Object.entries(selectedImages).map(([boxId, imagePath]) => (
              <div key={boxId} className="preview-item">
                <p>{`Selected from ${boxId}`}</p>
                <img src={imagePath} alt={`Preview for ${boxId}`} style={{ width: "100px", height: "100px" }} />
              </div>
            ))
          ) : (
            <p>No images selected</p>
          )}
        </div>
        <div className="rightcont">
          <GeneralBox
            item="marcos"
            images={images}
            icons={icons}
            isExpanded={expandedBox === "marcos"}
            onClick={() => handleBoxClick("marcos")}
            onImageSelect={(imagePath) => handleImageSelection("marcos", imagePath)}
          />
          <GeneralBox
            item="border"
            images={images}
            icons={icons}
            isExpanded={expandedBox === "border"}
            onClick={() => handleBoxClick("border")}
            onImageSelect={(imagePath) => handleImageSelection("border", imagePath)}
          />
          <GeneralBox
            item="hechizos"
            images={hechizos}
            icons={icons}
            isExpanded={expandedBox === "hechizos"}
            onClick={() => handleBoxClick("hechizos")}
            onImageSelect={(imagePath) => handleImageSelection("hechizos", imagePath)}
          />
          <button>Comprar</button>
        </div>
      </div>
    </main>
  );
}
