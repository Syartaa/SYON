import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Home from './Page/Home';
import About from './Page/About';
import Layout from './Page/Layout';
import ContactUs from './Page/ContactUs.JS'
import Gallery from './Page/Gallery';

function App() {
  return (
   <Router> 
    <Routes>

    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<ContactUs />}/>
      <Route path="/gallary" element={<Gallery />}/>

      
    </Route>
    </Routes>

   </Router>
  );
}

export default App;