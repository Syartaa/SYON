import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import Background from '../image/gallery.jpeg'; // Updated to gallery.jpeg
import foto1 from '../image/foto1.jpg';
import foto2 from '../image/foto2.jpg';
import foto3 from '../image/foto3.jpg';
import foto4 from '../image/foto4.jpg';
import foto5 from '../image/foto5.jpg';
import foto6 from '../image/foto6.jpg';

const artPieces = [
  {
    image: foto1,
    description: 'A beautiful painting of a serene landscape.',
  },
  {
    image: foto2,
    description: 'A stunning piece depicting modern art.',
  },
  {
    image: foto3,
    description: 'An exquisite portrayal of the ocean.',
  },
  {
    image: foto4,
    description: 'An abstract piece full of vibrant colors.',
  },
  {
    image: foto5,
    description: 'A modern artwork with a unique perspective.',
  },
  {
    image: foto6,
    description: 'Very beautiful exquisite colors',
  },
];

const ArtPieces = () => {
  const pixiContainerRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: true,
    });
    pixiContainerRef.current.appendChild(app.view);

    // Add background image
    const backgroundTexture = PIXI.Texture.from(Background); // Use gallery.jpeg for the background
    const background = new PIXI.Sprite(backgroundTexture);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);

    const cardWidth = 300;
    const cardHeight = 400;
    const padding = 50;
    const columns = 3; // Number of columns
    const totalWidth = columns * (cardWidth + padding) - padding; // Total width of the cards
    const startX = (app.screen.width - totalWidth) / 2; // Calculate start X position for centering

    const rows = Math.ceil(artPieces.length / columns);
    const canvasHeight = rows * (cardHeight + padding) + padding + 150;

    // Resize canvas based on the content height
    app.renderer.resize(window.innerWidth, canvasHeight);
    background.height = canvasHeight;

    // Add title
    const titleStyle = new PIXI.TextStyle({
      fill: '#ffffff',
      fontSize: 36,
      fontWeight: 'bold',
      stroke: '#000000',
      strokeThickness: 6,
    });

    const title = new PIXI.Text('Our Rare Art Pieces', titleStyle);
    title.x = app.screen.width / 2 - title.width / 2;
    title.y = 30;
    app.stage.addChild(title);

    artPieces.forEach((piece, index) => {
      const container = new PIXI.Container();
      container.x = startX + (index % columns) * (cardWidth + padding);
      container.y = Math.floor(index / columns) * (cardHeight + padding) + padding + 100;

      // Card background
      const cardBackground = new PIXI.Graphics();
      cardBackground.beginFill(0xffffff);
      cardBackground.drawRoundedRect(0, 0, cardWidth, cardHeight, 10);
      cardBackground.endFill();
      container.addChild(cardBackground);

      const mask = new PIXI.Graphics();
      mask.beginFill(0xffffff);
      mask.drawCircle(cardWidth / 2, cardWidth / 2, cardWidth / 2);
      mask.endFill();
      container.addChild(mask);

      const texture = PIXI.Texture.from(piece.image);
      const image = new PIXI.Sprite(texture);
      image.width = cardWidth;
      image.height = cardWidth;
      image.mask = mask;

      const graphics = new PIXI.Graphics();
      graphics.beginFill(0x000000, 0.5);
      graphics.drawRect(0, cardHeight - 100, cardWidth, 100);
      graphics.endFill();

      const style = new PIXI.TextStyle({
        fill: '#ffffff',
        fontSize: 14,
        wordWrap: true,
        wordWrapWidth: cardWidth - 20,
      });

      const description = new PIXI.Text(piece.description, style);
      description.x = 10;
      description.y = cardHeight - 90;

      container.addChild(image);
      container.addChild(graphics);
      container.addChild(description);

      // Add hover animation
      container.interactive = true;
      container.buttonMode = true;
      container.on('pointerover', () => {
        app.ticker.add(scaleUp);
        cardBackground.tint = 0xff0000;
      });
      container.on('pointerout', () => {
        app.ticker.add(scaleDown);
        cardBackground.tint = 0xffffff;
      });

      const scaleUp = () => {
        if (container.scale.x < 1.1) {
          container.scale.x += 0.01;
          container.scale.y += 0.01;
        } else {
          app.ticker.remove(scaleUp);
        }
      };

      const scaleDown = () => {
        if (container.scale.x > 1) {
          container.scale.x -= 0.01;
          container.scale.y -= 0.01;
        } else {
          app.ticker.remove(scaleDown);
        }
      };

      app.stage.addChild(container);
    });

    // Function to create floating sparkles
    const createSparkles = (count) => {
      for (let i = 0; i < count; i++) {
        const sparkle = new PIXI.Graphics();
        sparkle.beginFill(0xffffff, Math.random());
        sparkle.drawCircle(0, 0, Math.random() * 5 + 2);
        sparkle.endFill();
        
        sparkle.x = Math.random() * app.screen.width;
        sparkle.y = Math.random() * canvasHeight;
        
        const speedX = (Math.random() - 0.5) * 2;
        const speedY = (Math.random() - 0.5) * 2;

        sparkle.speedX = speedX;
        sparkle.speedY = speedY;
        
        app.stage.addChild(sparkle);
        
        app.ticker.add(() => {
          sparkle.x += sparkle.speedX;
          sparkle.y += sparkle.speedY;
          
          if (sparkle.x > app.screen.width || sparkle.x < 0) sparkle.speedX *= -1;
          if (sparkle.y > canvasHeight || sparkle.y < 0) sparkle.speedY *= -1;
        });
      }
    };

    createSparkles(100); // Create 100 sparkles

    const resize = () => {
      app.renderer.resize(window.innerWidth, canvasHeight);
      background.width = app.screen.width;
      background.height = canvasHeight;
      title.x = app.screen.width / 2 - title.width / 2;
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      app.destroy(true, { children: true });
    };
  }, []);

  return <div ref={pixiContainerRef} className="relative w-full" style={{ minHeight: '100vh' }} />;
};

export default ArtPieces;
