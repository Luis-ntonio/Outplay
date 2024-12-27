'use client';
import React, { useEffect, useRef, useState } from 'react';
import { toCanvas } from "html-to-image";
import GeneralBox from "../components/GeneralBox/GeneralBox";
import Image from "next/image";
import { adicionalesvalo, fondosvalo, marcosvalo, rankvalo } from "../../../imagePaths";
import { stat } from 'fs';


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
  const [extractedColors, setExtractedColors] = useState<string[]>([]);

  const updateImagePositions = () => {
    const preview = previewRef.current;
    if (!preview) {
      return;
    }

    const previewRect = preview.getBoundingClientRect();

    const newPositions = {
      image4: { left: (previewRect.right - previewRect.left)*0.30, top: (previewRect.bottom - previewRect.top) * 0.05 },
      image5: { left: (previewRect.right - previewRect.left)*0.7354, top: (previewRect.bottom - previewRect.top) * 0.75111 },
    };
    setImagePositions(newPositions);
  };

  useEffect(() => {
    updateImagePositions(); // Set positions on mount
    window.addEventListener('resize', updateImagePositions); // Update on resize

    return () => {
      window.removeEventListener('resize', updateImagePositions);
    };
  }, []);

  const extractColorsFromImage = (imageSrc: string) => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      const step = 4 * 100; // Adjust for sampling
      const colors = new Set<string>();
      for (let i = 0; i < imageData.length; i += step) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        colors.add(`rgb(${r},${g},${b})`);
        if (colors.size >= 4) break;
      }
      setExtractedColors(Array.from(colors));
    };
  };

  useEffect(() => {
    if (selectedImages.Fondo) extractColorsFromImage(selectedImages.Fondo);
  }, [selectedImages.Fondo]);

  useEffect(() => {
    if (extractedColors.length) {
      document.documentElement.style.setProperty('--color1', extractedColors[0]);
      document.documentElement.style.setProperty('--color2', extractedColors[1]);
      document.documentElement.style.setProperty('--color3', extractedColors[2]);
      document.documentElement.style.setProperty('--color4', extractedColors[3]);
    }
  }, [extractedColors]);

  const handleBoxClick = (boxId: string) => {
    console.log(boxId, "boxId", expandedBox)
    setExpandedBox((prevBox) => (prevBox === boxId ? null : boxId));
  };

  const handleInputChange = (boxId: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [boxId]: value }));
  };

  const handleImageSelection = (boxId: string, imagePath: string) => {
    setSelectedImages((prev) => ({ ...prev, [boxId]: imagePath }));
  };
  
  const handleButtonSelection = (state: boolean) => {
    console.log(state, "state")
    if (state) {
    setSelectedImages((prev) => ({ ...prev, ["Adicional2"]: "assets/Outplay/Adicionales/Recurso 2@4x.webp" }));
    setSelectedImages((prev) => ({ ...prev, ["Adicional3"]: "assets/Outplay/Adicionales/Recurso 3@4x.webp" }));
    }
    else {
      setSelectedImages((prev) => ({ ...prev, ["Adicional1"]: "" }));
      setSelectedImages((prev) => ({ ...prev, ["Adicional2"]: "" }));
      setSelectedImages((prev) => ({ ...prev, ["Adicional3"]: "" }));
    }
  }

  const handleClearAll = () => {
    setSelectedImages({}); // Reset all selected images
  };
  const handleDownload = () => {
    const preview = document.querySelector(".preview-valo");
  
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
    <main className="flex flex-col items-center justify-between p-24">
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
            item="Player card"
            ext="svg"
            images={fondosvalo}
            icons={icons}
            isExpanded={expandedBox === "Fondo"}
            onClick={() => handleBoxClick("Fondo")}
            onImageSelect={(imagePath) => handleImageSelection("Fondo", imagePath)}
          />
          <GeneralBox
            item="Adicionales"
            ext="svg"
            images={adicionalesvalo}
            icons={icons}
            type='button'
            isExpandedButton={expandedBox === "Adicionales"}
            onClick={() => handleBoxClick("Adicionales")}
            onButtonSelect={(state) => handleButtonSelection(state)}
          />
          <GeneralBox
            item="Nivel"
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
        <div className="preview-valo" ref={previewRef} style={{ position: "relative" }}>
            {/* Marcos (Background Layer) */}
            {selectedImages.Fondo && (
            <img
            className="image1 transform-image"
            src={selectedImages.Fondo}
            style={{ position: "absolute", width: "90%", height: "90%", bottom: "5%", left: "0%"}} 
            />
            )}
            <div className='simple-linear transform-image' style={{position: "absolute", bottom: "5%", left: "0%", width: "90%", height: "90%"}}>
7
            </div>
            {selectedImages.Adicional3 && (
              <img
              className="image2 transform-image2"
              src={selectedImages.Adicional3}
              style={{ position: "absolute", width: "100%", height: "26%" ,bottom: "7.5%", left: "-8%"}}
              />
            )}
            {selectedImages.Adicional2 && (
            <img
            className="image2 transform-image2"
            src={selectedImages.Adicional2}
            style={{ position: "absolute", width: "100%", height: "12.5%", bottom: "22%", left: "-9%"}}
            />
            )}
            
            <img
            className="image2 transform-image2"
            src={'assets/Outplay/Adicionales/Recurso 1@4x.webp'}
            style={{ position: "absolute", width: "100%", left: "-9%", bottom: "40%" }}
            />
            {/* Skin (Inside Marcos) */}
            {/* Border (Overlay Layer) */}
            {selectedImages.border && (
            <img
            className="image3 transform-image2"
            src={selectedImages.border}
            style={{ position: "absolute", width: "25%", height: "10%", bottom: "11.5%", left: "29.5%" }}
            />
            )}
            {/* Hechizos (Bottom Square) */}
            {selectedImages.marcos && (
            <img
              className="image4val transform-nivel"
              src={selectedImages.marcos}
              
              style={{ position: "absolute", top: `${imagePositions.image4?.top || 0}px`}}
            />
            )}
            {selectedImages.hechizos2 && (
            <img
              className="image5 transform-hechizos"
              src={selectedImages.hechizos2}
              style={{ position: "absolute", top: `${imagePositions.image5?.top || 0}px`, left: `${imagePositions.image5?.left || 0}px`,}}
            />
            )}
            {inputValues.text1 && (
            <h1
              className="text transform-nivel"
              style={{ 
                position: "absolute", fontFamily: "Valo_Regular"}}
              >
              {inputValues.text1}
            </h1>
            )}
            {inputValues.text2 && (
            <h1
              className="text2 transform-image2"
              style={{ color: "black", position: "absolute", left: "-10%", fontFamily: "Valo_Regular"}}
              >
              {inputValues.text2}
            </h1>
            )}
            
            
        </div>
        <div className="rightcont">
          <GeneralBox
            item="Marco"
            ext="svg"
            images={marcosvalo}
            icons={icons}
            isExpanded={expandedBox === "marcos"}
            onClick={() => handleBoxClick("marcos")}
            onImageSelect={(imagePath) => handleImageSelection("marcos", imagePath)}
          />
          <GeneralBox
            item="Rango"
            ext="svg"
            images={rankvalo}
            icons={icons}
            isExpanded={expandedBox === "border"}
            onClick={() => handleBoxClick("border")}
            onImageSelect={(imagePath) => handleImageSelection("border", imagePath)}
          />
          <GeneralBox
            item="Nick"
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
