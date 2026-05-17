import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Elementos globales persistentes */}
      <Navbar />
      
      {/* Contenedor adaptativo para las vistas asignadas por la ruta */}
      <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;