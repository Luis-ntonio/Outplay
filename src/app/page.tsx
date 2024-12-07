'use client';
import Image from "next/image";
import GeneralBox from "./components/GeneralBox/GeneralBox";
import path from "path";
import { imagePaths } from '../../imagePaths'; 
// ...

let images: string[] = imagePaths

let icons = [
  "/assets/images/png/icons/icon.svg",
  "/assets/images/png/icons/marcos.svg",
  "/assets/images/png/icons/border.svg",
  "/assets/images/png/icons/skin.svg",
  "/assets/images/png/icons/more.svg",
]

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed-header">Welcome!</div>
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex bigcont">
        <div className="leftcont">
          <GeneralBox item="icon" images={images} icons={icons} />
          <GeneralBox item="skin" images={images} icons={icons}/>
          <GeneralBox item="more" images={images} icons={icons}/>
        </div>
        <div className="preview">
          sfafasfsa
        </div>
        <div className="rightcont">
          <GeneralBox item="marcos" images={images} icons={icons}/>
          <GeneralBox item="border" images={images} icons={icons}/>
          <button>Comprar</button>
        </div>
        
      </div>



      
    </main>
  );
}

