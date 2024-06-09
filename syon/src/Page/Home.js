import React from 'react';
import Art1 from '../image/art1.jpg';
import Art2 from '../image/art2.jpg';
import Art3 from '../image/art3.jpg';
import Art5 from '../image/art5.jpg';
import Art6 from '../image/art6.jpg';
import Art7 from '../image/art7.jpg';
import Art8 from '../image/art8.jpg';
import Art9 from '../image/art9.jpg';
import Background from '../image/background.jpg';

// Sample images for the gallery
const images = [
  {
    src: Art1,
    title: 'Artwork 1',
    description: 'A vibrant landscape capturing the essence of nature.',
  },
  {
    src: Art2,
    title: 'Artwork 2',
    description: 'An abstract piece with bold colors and dynamic shapes.',
  },
  {
    src: Art3,
    title: 'Artwork 3',
    description: 'A serene depiction of a calm seaside at dusk.',
  },
  {
    src: Art5,
    title: 'Artwork 4',
    description: 'A detailed portrait showcasing deep emotion.',
  },
  {
    src: Art6,
    title: 'Artwork 5',
    description: 'A whimsical interpretation of a bustling cityscape.',
  },
  {
    src: Art7,
    title: 'Artwork 6',
    description: 'A minimalist design with clean lines and soft hues.',
  },
  {
    src: Art8,
    title: 'Artwork 7',
    description: 'An explosion of colors representing a vibrant festival.',
  },
  {
    src: Art9,
    title: 'Artwork 8',
    description: 'A tranquil forest scene with dappled sunlight.',
  },
  {
    src: Art9,
    title: 'Artwork 9',
    description: 'An intricate pattern work inspired by traditional motifs.',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-4xl font-bold text-center mb-10 text-white">S Y O N</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-75 rounded-lg shadow-lg w-60 overflow-hidden transform transition-transform duration-200 hover:scale-105"
          >
            <img src={image.src} alt={image.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{image.title}</h2>
              <p className="text-gray-700">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
