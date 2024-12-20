import React, { useState } from "react";
import ImageColumns from "../ImageColumns/ImageColumns";
import Image from "next/image";
import "../ImageColumns/ImageColumns.css";
import "./GeneralBox.css";

interface GeneralBoxProps {
  item: string;
  ext: string;
  images?: string[];
  icons: string[];
  isExpanded: boolean;
  type?: "image" | "input"; // Add "input" as a type
  onClick: () => void;
  onInputChange?: (value: string) => void; // Callback for input changes
  onImageSelect?: (imagePath: string) => void; // Callback to notify parent
}

const GeneralBox: React.FC<GeneralBoxProps> = ({ item, ext, images, icons, isExpanded, type = "image", onClick, onInputChange, onImageSelect }) => {
  const closeWindow = (func: Function) => {
    const GeneralBoxes = document.querySelectorAll(".GeneralBox");
    const collapsible = document.querySelectorAll(".collapsible");
    const salir = document.querySelectorAll(".salir");
    console.log(GeneralBoxes);
    salir.forEach((element) => {
      element.classList.remove("active");
    });
    GeneralBoxes.forEach((element) => {
      element.classList.remove("active");
    });
    collapsible.forEach((element) => {
      element.classList.remove("active");
    });
    func();
    console.log(GeneralBoxes);
  }
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (onInputChange) {
      onInputChange(value); // Notify the parent about the value change
    }
  };
  return (
    <div className="flash-border">
      
    <div
      className={`GeneralBox ${isExpanded ? "active" : ""} `}
      onClick={onClick}
      >
      <button className={ `salir ${isExpanded ? "active" : ""}`} onClick={() => closeWindow(onClick)}>X</button>
      <div className={`GeneralText`}>
        <Image
          className="icon"
          style={{ height: "100%" }}
          src={`/assets/images/png/icons/${item}.${ext}`}
          alt={`${item}`}
          width={50}
          height={50}
          />
        <span className="text52">{item}</span>
      </div>
      <div
        id={`${item}Box`}
        className={`collapsible ${isExpanded ? "active" : ""}`}
        onClick={(e) => e.stopPropagation()}
        >
        {type === "image" && images && (
          <ImageColumns
          type={item}
          images={images}
          onImageClick={onImageSelect || (() => {})}
          />
        )}
        {type === "input" && (
          <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Ingrese su ${item}`}
          className="input-field"
          />
        )}
      </div>
    </div>
    </div>
  );
};

export default GeneralBox;
