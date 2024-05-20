import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <section id="home">
        <h1>Home</h1>
      </section>
      <section id="exhibitions">
        <h1>Exhibitions</h1>
      </section>
      <section id="about">
        <h1>About Us</h1>
      </section>
    </div>
  );
}

export default App;
