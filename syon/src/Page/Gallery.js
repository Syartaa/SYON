import React, { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import Background from '../image/background.jpg'; // Import the background image
import img1 from '../image/art1.jpg';
import img2 from '../image/art2.jpg';
import img3 from '../image/art3.jpg';
import img4 from '../image/art5.jpg';
import img6 from '../image/art8.jpg';
import img7 from '../image/gallery.jpeg';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const images = [img1, img2, img3, img4, img7, img6];

  const appRef = useRef(null);
  const containerRef = useRef(null);
  const spritesRef = useRef([]);

  useEffect(() => {
    const app = new PIXI.Application({ width: 800, height: 600 });

    if (appRef.current) {
      appRef.current.appendChild(app.view);

      const container = new PIXI.Container();
      app.stage.addChild(container);
      containerRef.current = container;

      images.forEach((imagePath) => {
        PIXI.Loader.shared.add(imagePath); // Use PIXI.Loader.shared.add instead of creating a new loader instance
      });

      PIXI.Loader.shared.load((loader, resources) => {
        images.forEach((imagePath, index) => {
          const texture = resources[imagePath]?.texture;
          if (!texture) {
            console.error(`Failed to load texture for image at path: ${imagePath}`);
            return;
          }
          const sprite = new PIXI.Sprite(texture);
          sprite.visible = false;
          sprite.position.set(app.renderer.width / 2, app.renderer.height / 2); // Center the image within the PIXI application
          sprite.anchor.set(0.5); // Set the anchor to the center
          sprite.scale.set(Math.min(app.renderer.width / texture.width, app.renderer.height / texture.height)); // Scale the sprite to fit within the PIXI application
          container.addChild(sprite);
          spritesRef.current.push(sprite);
          if (index === 0) sprite.visible = true; // Show the first image initially
        });
      });
    }

    return () => app.destroy();
  }, []);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      spritesRef.current.forEach((sprite, index) => {
        sprite.visible = index === selectedImageIndex;
      });
    }
  }, [selectedImageIndex]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Our Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-w-screen-lg">
        {images.map((image, index) => (
          <div key={index} className="relative overflow-hidden">
            <img 
              src={image} 
              alt={`Image ${index + 1}`} 
              className="w-full h-auto cursor-pointer transform transition-transform duration-300 hover:scale-105 object-cover" 
              onClick={() => handleImageClick(index)} 
            />
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="absolute w-full h-full bg-black opacity-50" onClick={handleCloseModal}></div>
          <div className="z-10 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg max-w-screen-lg" ref={appRef}></div>
            <button className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-2xl" onClick={handlePrevImage}><FaArrowLeft /></button>
            <button className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white text-2xl" onClick={handleNextImage}><FaArrowRight /></button>
            {selectedImageIndex !== null && (
              <img 
                src={images[selectedImageIndex]} 
                alt={`Image ${selectedImageIndex + 1}`} 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                style={{ width: '640px', height: '600px' }} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
