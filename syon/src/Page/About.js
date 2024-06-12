import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Gal1 from '../image/gal1.jpg';
import Gal4 from '../image/gal4.jpg';
import Gal5 from '../image/gal5.png';
import Background from '../image/background.jpg';
import * as PIXI from 'pixi.js';

const AboutUs = () => {
  const pixiContainerRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      resizeTo: window,
      transparent: true,
    });
    pixiContainerRef.current.appendChild(app.view);

    // Create particles
    const particles = [];
    for (let i = 0; i < 100; i++) {
      const particle = new PIXI.Graphics();
      particle.beginFill(0xffffff);
      particle.drawCircle(0, 0, 2);
      particle.endFill();
      particle.x = Math.random() * window.innerWidth;
      particle.y = Math.random() * window.innerHeight;
      particle.vx = (Math.random() - 0.5) * 2;
      particle.vy = (Math.random() - 0.5) * 2;
      app.stage.addChild(particle);
      particles.push(particle);
    }

    // Animation loop
    app.ticker.add(() => {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;
      });
    });

    return () => {
      app.destroy(true, { children: true });
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-10 relative" style={{ backgroundImage: `url(${Background})` }}>
      <div ref={pixiContainerRef} className="absolute inset-0 z-0" />
      {/* Left image */}
      <img src={Gal1} alt="Gal 1" className="hidden lg:block absolute top-0 left-0 h-full w-1/4 object-cover z-10" />
      {/* Right image */}
      <img src={Gal5} alt="Gal 3" className="hidden lg:block absolute top-0 right-0 h-full w-1/4 object-cover z-10" />
      
      <div className="bg-black bg-opacity-50 py-10 rounded-lg relative z-20">
        <h1 className="text-4xl font-bold text-center mb-10 text-white">About Us</h1>
        <div className="max-w-4xl mx-auto">
          <Slider {...settings} className="rounded-lg overflow-hidden">
            <div>
              <img src={Gal1} alt="Gal 1" className="w-full h-auto rounded-lg" />
            </div>
            <div>
              <img src={Gal4} alt="Gal 2" className="w-full h-auto rounded-lg" />
            </div>
            <div>
              <img src={Gal5} alt="Gal 3" className="w-full h-auto rounded-lg" />
            </div>
          </Slider>
          <div className="mt-8 text-white">
            <p className="text-lg">
              The Gallery is a vibrant showcase of contemporary and traditional art, curated to inspire and engage art enthusiasts of all ages. Located in the heart of the city, our gallery features a diverse collection of paintings, sculptures, and mixed-media artworks from both established and emerging artists. With rotating exhibitions and curated showcases, we aim to foster a deeper appreciation for the arts and provide a platform for artistic expression. Whether you're a seasoned collector or a first-time visitor, our gallery invites you to explore, discover, and immerse yourself in the beauty and creativity of the art world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
