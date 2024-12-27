'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const redirectTo = (path: string) => {
    router.push(path);
  };

  return (
    <main className="flex flex-col items-center justify-center p-24">
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
      {/* Top Infinite Carousel */}
      <div className="carousel">
        <div className="carousel-track">
          {Array(100)
            .fill('Outplay')
            .map((text, index) => (
              <div className="carousel-item" key={index}>
                {text}
              </div>
            ))}
        </div>
      </div>
      <div className='HomeContainer'>
        <button
          onClick={() => redirectTo('/lol')}
          className="m-4 p-2 bg-blue-500 text-white rounded"
          style={{ 
            backgroundImage: "url('/assets/images/png/icons/Fondo LOL.jpeg')",
            backgroundSize: 'cover',
            width: '25vw',
            height: 'auto',
            aspectRatio: '3 / 4'
          }}
        >
        </button>
        <button
          onClick={() => redirectTo('/valorant')}
          className="m-4 p-2 bg-red-500 text-white rounded fondos-options"
          style={{ 
            backgroundImage: "url('/assets/images/png/icons/Fondo Valo.jpeg')",
            backgroundSize: 'cover',
            width: '25vw',
            height: 'auto',
            aspectRatio: '3 / 4'
          }}
        >
        </button>
      </div>
      {/* Bottom Infinite Carousel */}
      <div className="carousel">
        <div className="carousel-track">
          {Array(100)
            .fill('Outplay')
            .map((text, index) => (
              <div className="carousel-item" key={index}>
                {text}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
