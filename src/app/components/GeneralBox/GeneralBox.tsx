import React, { useState } from "react";
import ImageColumns from "../ImageColumns/ImageColumns";
import Image from "next/image";
import "../ImageColumns/ImageColumns.css";
import "./GeneralBox.css";

interface GeneralBoxProps {
  item: string;
  images: string[];
  icons: string[];
  isExpanded: boolean;
  onClick: () => void;
  onImageSelect: (imagePath: string) => void; // Callback to notify parent
}

const GeneralBox: React.FC<GeneralBoxProps> = ({ item, images, icons, isExpanded, onClick, onImageSelect }) => {
  return (
    <div
      className={`GeneralBox ${isExpanded ? "active" : ""}`}
      onClick={onClick}
    >
      <div className={`GeneralText`}>
        <Image
          className="icon"
          style={{ height: "100%" }}
          src={`/assets/images/png/icons/${item}.svg`}
          alt={`${item}`}
          width={50}
          height={50}
        />
        <span className="text52">Encabezado {item}</span>
      </div>
      <div
        id={`${item}Box`}
        className={`collapsible ${isExpanded ? "active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ImageColumns
          type={item}
          images={images}
          onImageClick={onImageSelect} // Pass callback to ImageColumns
        />
      </div>
    </div>
  );
};

export default GeneralBox;
