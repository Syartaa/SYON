import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import Background from '../image/background.jpg';
import artist1 from '../image/artist1.mp4';
import artist2 from '../image/artist2.mp4';
import artist3 from '../image/artist3.mp4'; // Changed to image for variety
import artist4 from '../image/artist4.png';
import artist5 from '../image/artist5.jpg';
import artist6 from '../image/artist6.jpg';

const artists = [
    {
        media: artist1,
        type: 'video',
        description: 'Emma: An amazing painter known for sculptures.',
    },
    {
        media: artist2,
        type: 'video',
        description: 'Amanda: A contemporary artist with stunning video art.',
    },
    {
        media: artist3,
        type: 'image',
        description: 'Sarah: Known for abstract art full of vibrant colors.',
    },
    {
        media: artist4,
        type: 'image',
        description: 'Sarah: Known for abstract art full of vibrant colors.',
    },
    {
        media: artist5,
        type: 'image',
        description: 'Sarah: Known for abstract art full of vibrant colors.',
    },
    {
        media: artist6,
        type: 'image',
        description: 'Sarah: Known for abstract art full of vibrant colors.',
    },
];

const Artist = () => {
    const pixiContainerRef = useRef(null);
    const [selectedArtist, setSelectedArtist] = useState(null);

    useEffect(() => {
        let app = null;

        const initializePixiApp = () => {
            app = new PIXI.Application({
                width: pixiContainerRef.current.offsetWidth,
                height: window.innerHeight, // Adjusted to match full window height
                transparent: true,
            });
            pixiContainerRef.current.appendChild(app.view);

            // Add background image
            const backgroundTexture = PIXI.Texture.from(Background);
            const background = new PIXI.Sprite(backgroundTexture);
            background.width = app.screen.width;
            background.height = app.screen.height;
            app.stage.addChild(background);

            const centerX = app.screen.width / 2;
            const centerY = app.screen.height / 2; // Adjusted centerY
            const radius = 250; // Decreased radius
            const angleStep = (2 * Math.PI) / artists.length;

            const titleStyle = new PIXI.TextStyle({
                fill: '#ffffff',
                fontSize: 36,
                fontWeight: 'bold',
                stroke: '#000000',
                strokeThickness: 6,
            });

            const title = new PIXI.Text('Our Talented Artists', titleStyle);
            title.x = app.screen.width / 2 - title.width / 2;
            title.y = 30;
            app.stage.addChild(title);

            artists.forEach((artist, index) => {
                const angle = index * angleStep;
                const container = new PIXI.Container();
                container.x = centerX + radius * Math.cos(angle);
                container.y = centerY + radius * Math.sin(angle);

                const cardWidth = 200; // Decreased cardWidth
                const cardHeight = 300; // Decreased cardHeight

                const cardBackground = new PIXI.Graphics();
                cardBackground.beginFill(0xffffff);
                cardBackground.drawRoundedRect(0, 0, cardWidth, cardHeight, 20); // Increased borderRadius
                cardBackground.endFill();
                container.addChild(cardBackground);

                const descriptionStyle = new PIXI.TextStyle({
                    fill: '#000000',
                    fontSize: 14,
                    wordWrap: true,
                    wordWrapWidth: cardWidth - 20,
                });

                const description = new PIXI.Text(artist.description, descriptionStyle);
                description.x = 10;
                description.y = cardHeight - 60;
                container.addChild(description);

                if (artist.type === 'image') {
                    const texture = PIXI.Texture.from(artist.media);
                    const image = new PIXI.Sprite(texture);
                    image.width = cardWidth;
                    image.height = cardHeight - 100;
                    container.addChild(image);
                } else if (artist.type === 'video') {
                    const texture = PIXI.Texture.from(artist.media);
                    const videoSprite = new PIXI.Sprite(texture);
                    videoSprite.width = cardWidth;
                    videoSprite.height = cardHeight - 100;
                    container.addChild(videoSprite);

                    const videoDescription = new PIXI.Text(artist.description, descriptionStyle);
                    videoDescription.x = 10;
                    videoDescription.y = cardHeight - 90;
                    container.addChild(videoDescription);
                }

                container.interactive = true;
                container.buttonMode = true;
                container.on('pointerdown', () => {
                    setSelectedArtist(artist);
                });

                app.stage.addChild(container);

                // Circular rotation animation (slowed down)
                app.ticker.add(() => {
                    const newAngle = angle + app.ticker.lastTime / 3000; // Adjusted rotation speed
                    container.x = centerX + radius * Math.cos(newAngle);
                    container.y = centerY + radius * Math.sin(newAngle);
                });
            });
        };

        initializePixiApp();

        const handleResize = () => {
            if (app) {
                app.renderer.resize(pixiContainerRef.current.offsetWidth, window.innerHeight); // Adjusted to match full window height
                const background = app.stage.children.find(child => child instanceof PIXI.Sprite);
                if (background) {
                    background.width = app.screen.width;
                    background.height = app.screen.height;
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (app) {
                app.destroy(true, { children: true });
                app = null;
            }
        };
    }, []);

    const handleCloseModal = () => {
        setSelectedArtist(null);
    };

    const handlePlayVideo = () => {
        const videoElement = document.getElementById('artist-video');
        if (videoElement) {
            videoElement.play();
        }
    };

    return (
        <div style={{ overflowY: 'auto', height: '100vh' }}>
            <div ref={pixiContainerRef} className="relative w-full" style={{ minHeight: '100vh' }} />
            {selectedArtist && (
                <div className="modal">
                    <div className="modal-content">
                        {selectedArtist.type === 'image' ? (
                            <img src={selectedArtist.media} alt={selectedArtist.description} />
                        ) : (
                            <div>
                                <video id="artist-video" width="100%" controls onClick={handlePlayVideo}>
                                    <source src={selectedArtist.media} type="video/mp4" />
                                   
                                    Your browser does not support the video tag.
</video>
</div>
)}
<p>{selectedArtist.description}</p>
<button onClick={handleCloseModal}>Close</button>
</div>
</div>
)}
</div>
);
};

export default Artist;