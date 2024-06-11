import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import img1 from '../image/syon1.jpeg';
import img2 from '../image/syon2.jpg';
import img3 from '../image/img1.jpg';

const SliderGallery = () => {
  const sliderImgsRef = useRef([]);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sliderPos, setSliderPos] = useState(0);
  const [canvasPos, setCanvasPos] = useState({ x: 0 });
  const [resolution, setResolution] = useState({ x: window.innerWidth, y: window.innerHeight });
  const [time, setTime] = useState(0);
  const [pixiImgs, setPixiImgs] = useState([]);

  const makeSize = () => {
    let width = 0;
    sliderImgsRef.current.forEach(slide => {
      width += slide.offsetWidth + 5;
    });
    setSliderWidth(width);
  };

  useEffect(() => {
    makeSize();
    const resolution = { x: window.innerWidth, y: window.innerHeight };

    const app = new PIXI.Application({ width: resolution.x, height: resolution.y });
    document.body.appendChild(app.view);

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = resolution.x;
    bg.height = resolution.y;
    bg.tint = 0x222222;
    app.stage.addChild(bg);

    const container = new PIXI.Container();
    app.stage.addChild(container);

    sliderImgsRef.current.forEach((slide, idx) => {
      const img = slide.querySelector('img');
      const imgRect = img.getBoundingClientRect();
      const pixiImg = PIXI.Sprite.from(img.src);
      pixiImg.width = imgRect.width;
      pixiImg.height = imgRect.height;
      pixiImg.x = imgRect.left;
      pixiImg.y = imgRect.top;
      container.addChild(pixiImg);
      img.style.display = 'none';
      setPixiImgs(prevPixiImgs => [...prevPixiImgs, pixiImg]);
    });

    const shaderElement = document.getElementById("shader");
    const shaderCode = shaderElement ? shaderElement.innerHTML : '';

    const simpleShader = new PIXI.Filter('', shaderCode, {
      u_mouse: mousePos,
      u_resolution: resolution,
      u_time: time,
      u_strength: 1.0
    });
    simpleShader.padding = 200;
    app.stage.filters = [simpleShader];

    app.ticker.add(() => {
      container.x = canvasPos.x;
      setTime(prevTime => prevTime + 0.01);
      simpleShader.uniforms.u_time = time;
      simpleShader.uniforms.u_mouse = [mousePos.x, mousePos.y];
    });

    const loader = new PIXI.Loader();
    sliderImgsRef.current.forEach(slide => {
      const img = slide.querySelector('img');
      loader.add(img.src);
    });
    loader.load();

    return () => {
      loader.destroy();
      if (app) {
        app.destroy(true);
      }
    };
  }, [resolution, time, mousePos]);

  const onMouseDown = (e) => {
    e.preventDefault();
    setMouseDown(true);
    setMouseStart({ x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY });
  };

  const onMouseMove = (e) => {
    setMousePos({ x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY });
    if (mouseDown) {
      setCanvasPos(prevCanvasPos => ({ x: (sliderPos + mousePos.x - mouseStart.x) }));
    }
  };

  const onMouseUp = () => {
    setMouseDown(false);
    setSliderPos(prevSliderPos => prevSliderPos + (mousePos.x - mouseStart.x));
  };

  const handleScroll = (e) => {
    e.preventDefault();
    setCanvasPos(prevCanvasPos => ({ x: prevCanvasPos.x - e.deltaY }));
  };

  const slideNext = () => {
    let slideTo = canvasPos.x - (sliderWidth / sliderImgsRef.current.length);
    if (slideTo > sliderWidth * -1 && slideTo <= 0) {
      setSliderPos(slideTo);
      gsap.to(canvasPos, .3, { x: slideTo });
      gsap.to('.slider', .3, { x: slideTo });
    }
  };

  const slidePrev = () => {
    let slideTo = canvasPos.x + (sliderWidth / sliderImgsRef.current.length);
    if (slideTo > sliderWidth * -1 && slideTo <= 0) {
      setSliderPos(slideTo);
      gsap.to(canvasPos, .3, { x: slideTo });
      gsap.to('.slider', .3, { x: slideTo });
    }
  };

  return (
    <div className="slider-container" onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onWheel={handleScroll}>
      <div className="slider">
        <div className="slide" ref={el => sliderImgsRef.current[0] = el}>
          <img className="slide-img" src={img1} alt="Slide 1" />
          <div className="slide-text">Munich</div>
        </div>
        <div className="slide" ref={el => sliderImgsRef.current[1] = el}>
          <img className="slide-img" src={img2} alt="Slide 2" />
          <div className="slide-text">Berlin</div>
        </div>
        <div className="slide" ref={el => sliderImgsRef.current[2] = el}>
          <img className="slide-img" src={img3} alt="Slide 3" />
          <div className="slide-text">Hamburg</div>
        </div>
      </div>
      <div className="left-top">Scroll</div>
      <div className="right-top">or drag</div>
      <div className="left-bottom slider-nav-prev" onClick={slidePrev}>previous</div>
      <div className="right-bottom slider-nav-next" onClick={slideNext}>next</div>
    </div>
  );
};

export default SliderGallery;
