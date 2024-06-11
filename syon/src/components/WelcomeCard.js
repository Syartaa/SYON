import React from 'react';
import videoSource from '../Video/7677510-hd_1920_1080_25fps.mp4'; // Import video source
import '../Css/Welcome.css'; // Import CSS file for styling

const WelcomeCard = () => {
  return (
    <div className="welcome-card mb-20 rounded-lg">
      <video className="video-background" autoPlay muted loop>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1 className="title">SYON Art Gallery</h1>
        <p className="description">Welcome to this magical world of art, masterpieces, and amazing collections! We display, borrow, and collect artworks from around the world.</p>
      </div>
    </div>
  );
};

export default WelcomeCard;
