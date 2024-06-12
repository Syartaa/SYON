import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import Background from '../image/background.jpg';
import artist1 from '../image/artist1.mp4';
import artist2 from '../image/artist2.mp4';
import artist3 from '../image/artistt.jpg';
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
                height: window.innerHeight,
                transparent: true,
            });
            pixiContainerRef.current.appendChild(app.view);

            const backgroundTexture = PIXI.Texture.from(Background);
            const background = new PIXI.Sprite(backgroundTexture);
            background.width = app.screen.width;
            background.height = app.screen.height;
            app.stage.addChild(background);

            const centerX = app.screen.width / 2;
            const centerY = app.screen.height / 2 - 100; // Adjusted centerY to move content higher
            const radius = 230;
            const angleStep = (2 * Math.PI) / artists.length;

            const titleStyle = new PIXI.TextStyle({
                fill: '#ffffff',
                fontSize: 36,
                fontWeight: 'bold',
                stroke: '#000000',
                strokeThickness: 6,
            });

            const title = new PIXI.Text('Our Talented Artists', titleStyle);
            title.x = centerX - title.width / 2;
            title.y = centerY - radius - 100; // Adjusted title position to move it higher
            app.stage.addChild(title);

            artists.forEach((artist, index) => {
                const angle = index * angleStep;
                const container = new PIXI.Container();
                container.x = centerX + radius * Math.cos(angle);
                container.y = centerY + radius * Math.sin(angle) - 50; // Adjusted card position to move it higher

                const cardWidth = 200;
                const cardHeight = 300;

                const cardBackground = new PIXI.Graphics();
                cardBackground.beginFill(0xffffff);
                cardBackground.drawRoundedRect(0, 0, cardWidth, cardHeight, 20);
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
                }

                container.interactive = true;
                container.buttonMode = true;
                container.on('pointerdown', () => {
                    setSelectedArtist(artist);
                });

                app.stage.addChild(container);

                app.ticker.add(() => {
                    const newAngle = angle + app.ticker.lastTime / 3000;
                    container.x = centerX + radius * Math.cos(newAngle);
                    container.y = centerY + radius * Math.sin(newAngle) - 50; // Adjusted card position to move it higher
                });
            });
        };

        initializePixiApp();

        const handleResize = () => {
            if (app) {
                app.renderer.resize(pixiContainerRef.current.offsetWidth, window.innerHeight);
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
                <div className="modal" style={modalStyles}>
                    <div className="modal-content" style={modalContentStyles}>
                        <span className="close" onClick={handleCloseModal} style={closeButtonStyles}>&times;</span>
                        <div style={{ height: '400px', overflowY: 'auto' }}>
                            {selectedArtist.type === 'image' ? (
                                <img src={selectedArtist.media} alt={selectedArtist.description} style={{ width: '100%' }} />
                            ) : (
                                <div>
                                    <video id="artist-video" width="100%" controls onClick={handlePlayVideo}>
                                        <source src={selectedArtist.media} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}
                            <p>{selectedArtist.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const modalStyles = {
    display: 'block',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyles = {
    backgroundColor: '#fefefe',
    padding: '20px',
    border: '1px solid #888',
    width: '700px',
    height: '600px',
    boxSizing: 'border-box',
    position: 'relative',
};

const closeButtonStyles = {
    color: '#aaa',
    position: 'absolute',
    top: '10px',
    right: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
};

export default Artist;
