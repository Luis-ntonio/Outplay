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
  isExpanded?: boolean;
  isExpandedInput?: boolean;
  isExpandedButton?: boolean;
  type?: "image" | "input" | "button"; // Add "input" and "button" as types
  onClick: () => void;
  onInputChange?: (value: string) => void; // Callback for input changes
  onImageSelect?: (imagePath: string) => void; // Callback to notify parent
  onButtonSelect?: (state: boolean) => void; // Callback to notify parent
}

const GeneralBox: React.FC<GeneralBoxProps> = ({
  item,
  ext,
  images,
  icons,
  isExpanded,
  isExpandedInput,
  isExpandedButton,
  type = "image",
  onClick,
  onInputChange,
  onImageSelect,
  onButtonSelect,
}) => {
  const closeWindow = (func: Function) => {
    const GeneralBoxes = document.querySelectorAll(".GeneralBox");
    const collapsible = document.querySelectorAll(".collapsible");
    const salir = document.querySelectorAll(".salir");
    salir.forEach((element) => {
      element.classList.remove("active", "show", "showButton");
    });
    GeneralBoxes.forEach((element) => {
      element.classList.remove("active", "show", "showButton");
    });
    collapsible.forEach((element) => {
      element.classList.remove("active", "show", "showButton");
    });
    func();
  };

  const [inputValue, setInputValue] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (onInputChange) {
      onInputChange(value); // Notify the parent about the value change
    }
  };

  const toggleEnable = () => {
    const newState = !isEnabled; // Calculate the new state
    setIsEnabled(newState); // Update the state
    if (onButtonSelect) {
      onButtonSelect(newState); // Notify the parent about the new state
    }
  };

  const handleCollapsible = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLSpanElement>
  ) => {
    console.log("Collapsible clicked");
    if (type === "button") {
      e.stopPropagation();
      toggleEnable(); // Toggle enable/disable when interacting with the button
    }
    onClick(); // Handle regular clicks
  };

  return (
    <div className="flash-border">
      <div
        className={`GeneralBox ${isExpanded ? "active" : ""} ${isExpandedButton ? "showButton" : ""}`}
        onClick={(e) => {
          handleCollapsible(e);
        }}
      >
        <button
          className={`salir ${isExpanded ? "active" : ""} ${
            isExpandedInput ? "show" : ""
          } ${isExpandedButton ? "showButton" : ""}`}
          onClick={() => closeWindow(onClick)}
        >
          X
        </button>
        <div className={`GeneralText`}>
          <Image
            className="icon"
            style={{ height: "100%" }}
            src={`/assets/images/png/icons/${item === "Player card" || item === "Adicionales" ? "Skin" : item === 'Nivel' || item === 'Nick' ? 'Hechizo 1' : item === 'Rango' ? 'Borde' : item === 'Marco de Nivel' ? 'Marco' : item}.${ext}`}
            alt={`${item}`}
            width={50}
            height={50}
          />
          <span className="text52">{item}</span>
        </div>
        <div
          id={`${item}Box`}
          className={`collapsible ${isExpanded ? "active" : ""} ${
            isExpandedInput ? "show" : ""
          } ${type === "button" ? "button" : ""}`}
          onClick={(e) => handleCollapsible(e)}
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
              className={`input-field`}
            />
          )}
          {type === "button" && (
            <label className="switch">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => e.stopPropagation()}
              />
              <span className="slider" 
                
              ></span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralBox;
