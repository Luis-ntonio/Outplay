'use client';
import React, { useEffect, useRef, useState } from 'react';
import { toCanvas } from "html-to-image";
import GeneralBox from "./components/GeneralBox/GeneralBox";
import Image from "next/image";
import { skins, icons_, runas1, runas2, hechizos1, hechizos2, marcos, bordes } from "../../imagePaths";

let images: string[] = skins; // For skins
let iconImages: string[] = icons_; // For icons

let icons = [
  "/assets/images/png/icons/icon.svg",
  "/assets/images/png/icons/Icono.svg",
  "/assets/images/png/icons/Marco.svg",
  "/assets/images/png/icons/Borde.svg",
  "/assets/images/png/icons/Skin.svg",
  "/assets/images/png/icons/Runa Secundaria.png",
  "/assets/images/png/icons/Runa Principal.png",
  "/assets/images/png/icons/Hechizo 1.png",
  "/assets/images/png/icons/Hechizo 2.png",
];

export default function Home() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [expandedBox, setExpandedBox] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({}); // For input values

  const [imagePositions, setImagePositions] = useState<{ [key: string]: { left: number; top: number } }>({});

  const updateImagePositions = () => {
    console.log('updateImagePositions called'); // Debugging log
    const preview = previewRef.current;
    if (!preview) {
      console.log('previewRef is null'); // Log if ref is not attached
      return;
    }

    const previewRect = preview.getBoundingClientRect();
    console.log('Preview Rect:', previewRect); // Log the dimensions

    const newPositions = {
      image4: { left: (previewRect.right - previewRect.left)*0.63986, top: (previewRect.bottom - previewRect.top) * 0.80111 },
      image5: { left: (previewRect.right - previewRect.left)*0.7354, top: (previewRect.bottom - previewRect.top) * 0.80111 },
      image6: { left: (previewRect.right - previewRect.left)*0.18, top: (previewRect.bottom - previewRect.top) * 0.773 },
      image7: { left: (previewRect.right - previewRect.left)*0.254, top: (previewRect.bottom - previewRect.top) * 0.79 },
      image8: { left: (previewRect.right - previewRect.left)*0.4, top: (previewRect.bottom - previewRect.top) * 0.77 },
      text1: { left: (previewRect.right - previewRect.left)*(-0.03), top: (previewRect.bottom - previewRect.top) * 0.725 },
      text2: { left: (previewRect.right - previewRect.left)*(-0.03), top: (previewRect.bottom - previewRect.top) * 0.87 },
    };
    setImagePositions(newPositions);
  };

  useEffect(() => {
    console.log('useEffect triggered'); // Check if useEffect runs
    updateImagePositions(); // Set positions on mount
    window.addEventListener('resize', updateImagePositions); // Update on resize

    return () => {
      console.log('Cleanup executed'); // Log cleanup
      window.removeEventListener('resize', updateImagePositions);
    };
  }, []);

  const handleBoxClick = (boxId: string) => {
    setExpandedBox((prevBox) => (prevBox === boxId ? null : boxId));
  };

  const handleInputChange = (boxId: string, value: string) => {
    console.log('Input Value:', inputValues); // Log the input value  
    setInputValues((prev) => ({ ...prev, [boxId]: value }));
  };

  const handleImageSelection = (boxId: string, imagePath: string) => {
    setSelectedImages((prev) => ({ ...prev, [boxId]: imagePath }));
  };

  const handleClearAll = () => {
    setSelectedImages({}); // Reset all selected images
  };
  const handleDownload = () => {
    const preview = document.querySelector(".preview");
  
    if (!preview) return;
  
    toCanvas(preview as HTMLElement)
      .then((canvas) => {
        // Create an anchor to download the canvas as an image
        const link = document.createElement("a");
        link.download = "preview.png";
        link.href = canvas.toDataURL();
        link.click();
      })
      .catch((err) => {
        console.error("Error capturing preview:", err);
      });
  };

  return (
    <main className="flex flex-col items-center justify-between p-24 font-Panchang_Complete">
      <div className="bg"></div>

      <div className="star-field">
      <div className="layer"></div>
      <div className="layer"></div>
      <div className="layer"></div>
      </div>
      <div className="fixed-header">
        <h1>Bienvenidos a Outplay!</h1>
        <Image 
          className="icon"
          style={{ height: "100%" }}
          alt="logo"
          src={`/assets/Outplay/Sin fondo (Blanco).png`}
          width={50}
          height={50}
        />
      </div>
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex bigcont">
        <div className="leftcont">
          <GeneralBox
            item="Icono"
            ext="svg"
            images={iconImages}
            icons={icons}
            isExpanded={expandedBox === "icon"}
            onClick={() => handleBoxClick("icon")}
            onImageSelect={(imagePath) => handleImageSelection("icon", imagePath)}
          />
          <GeneralBox
            item="Skin"
            ext="svg"
            images={images}
            icons={icons}
            isExpanded={expandedBox === "skin"}
            onClick={() => handleBoxClick("skin")}
            onImageSelect={(imagePath) => handleImageSelection("skin", imagePath)}
          />
          <GeneralBox
            item="Runa Principal"
            ext="png"
            images={runas1}
            icons={icons}
            isExpanded={expandedBox === "runas1"}
            onClick={() => handleBoxClick("runas1")}
            onImageSelect={(imagePath) => handleImageSelection("runas1", imagePath)}
          />
          <GeneralBox
            item="Runa Secundaria"
            ext="png"
            images={runas2}
            icons={icons}
            isExpanded={expandedBox === "runas2"}
            onClick={() => handleBoxClick("runas2")}
            onImageSelect={(imagePath) => handleImageSelection("runas2", imagePath)}
          />
          <GeneralBox
            item="Nombre de Skin"
            ext="png"
            type="input"
            icons={icons}
            isExpandedInput={expandedBox === "text1"}
            onClick={() => handleBoxClick("text1")}
            onInputChange={(value) => handleInputChange("text1", value)}
          />
            <button
            className="clear-all-button"
            onClick={handleClearAll}
            
            >
            Clear All
            </button>
        </div>
        <div className="preview" ref={previewRef} style={{ position: "relative" }}>
            {/* Marcos (Background Layer) */}
            {selectedImages.skin && (
            <img
            className="image1 transform-image"
            src={selectedImages.skin}
            style={{ position: "absolute", width: "90%", height: "90%", top: "5%", left: "5%"}} 
            />
            )}
            <div className='simple-linear transform-image' style={{position: "relative", top: "11%", left: "0", width: "90%", height: "65%"}}>

            </div>
            {selectedImages.marcos && (
            <img
            className="image2"
            src={selectedImages.marcos}
            style={{ position: "absolute", width: "100%", height: "100%"}}
            />
            )}
            
            {/* Skin (Inside Marcos) */}
            {/* Border (Overlay Layer) */}
            {selectedImages.border && (
            <img
            className="image3"
            src={selectedImages.border}
            style={{ position: "absolute", width: "100%", height: "100%", top: "0%", left: "0%" }}
            />
            )}
            {/* Hechizos (Bottom Square) */}
            {selectedImages.hechizos1 && (
            <img
              className="image4 transform-hechizos"
              src={selectedImages.hechizos1}
              
              style={{ position: "absolute", top: `${imagePositions.image4?.top || 0}px`, left: `${imagePositions.image4?.left || 0}px`,}}
            />
            )}
            {selectedImages.hechizos2 && (
            <img
              className="image5 transform-hechizos"
              src={selectedImages.hechizos2}
              style={{ position: "absolute", top: `${imagePositions.image5?.top || 0}px`, left: `${imagePositions.image5?.left || 0}px`,}}
            />
            )}
            {/* Fixed Image */}
            <img
            src="/assets/Outplay/OTROS/BOTTOM_3D.webp"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            />
            {/* Runas (Bottom Circle) */}
            {selectedImages.runas1 && (
            <img
              className="image6 transform-image"
              src={selectedImages.runas1}
              
              style={{ position: "absolute", top: `${imagePositions.image6?.top || 0}px`, left: `${imagePositions.image6?.left || 0}px`,}}
            />
            )}
            {selectedImages.runas2 && (
            <img
              className="image7 transform-image"
              src={selectedImages.runas2}
              style={{ position: "absolute", top: `${imagePositions.image7?.top || 0}px`, left: `${imagePositions.image7?.left || 0}px`,}}
            />
            )}
            {selectedImages.icon && (
            <img
              className="image8 transform-image"
              src={selectedImages.icon}
              style={{ position: "absolute", top: `${imagePositions.image8?.top || 0}px`, left: `${imagePositions.image8?.left || 0}px`,}}
            />
            )}
            {inputValues.text1 && (
            <h1
              className="text transform-hechizos"
              style={{ 
                position: "absolute", top: `${imagePositions.text1?.top || 0}px`, left: `${imagePositions.text1?.left || 0}px`,}}
              >
              {inputValues.text1}
            </h1>
            )}
            {inputValues.text2 && (
            <h1
              className="text transform-hechizos"
              style={{ color: "yellow", position: "absolute", top: `${imagePositions.text2?.top || 0}px`, left: `${imagePositions.text2?.left || 0}px`,}}
              >
              {inputValues.text2}
            </h1>
            )}
            
            
        </div>
        <div className="rightcont">
          <GeneralBox
            item="Marco"
            ext="svg"
            images={marcos}
            icons={icons}
            isExpanded={expandedBox === "marcos"}
            onClick={() => handleBoxClick("marcos")}
            onImageSelect={(imagePath) => handleImageSelection("marcos", imagePath)}
          />
          <GeneralBox
            item="Borde"
            ext="svg"
            images={bordes}
            icons={icons}
            isExpanded={expandedBox === "border"}
            onClick={() => handleBoxClick("border")}
            onImageSelect={(imagePath) => handleImageSelection("border", imagePath)}
          />
          <GeneralBox
            item="Hechizo 1"
            ext="png"
            images={hechizos1}
            icons={icons}
            isExpanded={expandedBox === "hechizos1"}
            onClick={() => handleBoxClick("hechizos1")}
            onImageSelect={(imagePath) => handleImageSelection("hechizos1", imagePath)}
          />
          <GeneralBox
            item="Hechizo 2"
            ext="png"
            images={hechizos2}
            icons={icons}
            isExpanded={expandedBox === "hechizos2"}
            onClick={() => handleBoxClick("hechizos2")}
            onImageSelect={(imagePath) => handleImageSelection("hechizos2", imagePath)}
          />
          <GeneralBox
            item="Nombre de Invocador"
            ext="png"
            type="input"
            icons={icons}
            isExpandedInput={expandedBox === "text2"}
            onClick={() => handleBoxClick("text2")}
            onInputChange={(value) => handleInputChange("text2", value)}
          />
          <button className="comprar" onClick={handleDownload}>Comprar</button>
        </div>
      </div>
    </main>
  );
}
