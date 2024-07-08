import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Pasajero from './components/Pasajero';
import Conductor from './components/Conductor';
import JefeDeFlota from './components/JefeDeFlota';



function App() {
  return (
    
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/pasajero" element={<Pasajero/>} />
          <Route path="/conductor" element={<Conductor/>} />
          <Route path="/jefe-de-flota" element={<JefeDeFlota/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
