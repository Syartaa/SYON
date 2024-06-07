import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Slider from './components/Slider';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import About from './Pages/About';
import Layout from './Pages/Layout';

function App() {
  return (
   <Router> 
    <Routes>

    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
    </Route>
    </Routes>

   </Router>
  );
}

export default App;
