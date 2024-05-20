import React, { useState } from 'react';
import './navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">SYON</div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
        <a href="#exhibitions" onClick={() => setIsOpen(false)}>Exhibitions</a>
        <a href="#about" onClick={() => setIsOpen(false)}>About Us</a>
      </div>
      <div className="nav-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar
