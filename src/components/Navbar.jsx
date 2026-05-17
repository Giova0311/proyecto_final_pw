import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const manejarCerrarSesion = () => {
    localStorage.clear(); 
    navigate('/login');
    window.location.reload();
};

  return (
    <nav style={{ 
      padding: '15px 30px', background: '#1a252f', color: '#fff', 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
        Smart Estate
      </Link>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/properties" style={{ color: '#fff', textDecoration: 'none' }}>Propiedades</Link>
        
        {/* Enlace dinámico: Solo visible para creadores de contenido inmobiliario */}
        {loggedInUser && (loggedInUser.role === 'owner' || loggedInUser.role === 'admin') && (
          <Link to="/add-property" style={{ color: '#2ecc71', textDecoration: 'none', fontWeight: 'bold' }}>
            ➕ Publicar Inmueble
          </Link>
        )}

        <Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contacto</Link>

        {loggedInUser ? (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginLeft: '10px', paddingLeft: '15px', borderLeft: '1px solid #4f5d73' }}>
            <span style={{ fontSize: '13px', color: '#bdc3c7' }}>
              👤 {loggedInUser.name} (<strong style={{ color: '#e74c3c' }}>{loggedInUser.role}</strong>)
            </span>
            <button onClick={manejarCerrarSesion} style={{ backgroundColor: 'transparent', color: '#e74c3c', border: '1px solid #e74c3c', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
              Salir
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ backgroundColor: '#3498db', color: '#fff', textDecoration: 'none', padding: '6px 15px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px' }}>
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;