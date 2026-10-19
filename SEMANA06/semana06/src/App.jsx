import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Agregados from './pages/Agregados';
import Servicios from './pages/Servicios';
import Noticias from './pages/Noticias';
import Contacto from './pages/Contacto';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agregados" element={<Agregados />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
