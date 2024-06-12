import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Page/Home';
import About from './Page/About';
import Layout from './Page/Layout';
import ArtPieces from './Page/ArtPieces';
import Gallery from './Page/Gallery';
import BookingPage from './Page/Booking';
import Artist from './Page/Artist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />  {/* This makes Home the default page */}
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="pieces" element={<ArtPieces />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="artists" element={<Artist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
