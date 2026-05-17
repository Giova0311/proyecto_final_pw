import React from 'react';
import { Link } from 'react-router-dom'; 

function PropertyCard({ property }) {
  const { id, title, price, location, area, type } = property;

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#fff',
      padding: '15px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <span style={{ 
        fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', 
        color: type === 'Venta' ? '#27ae60' : '#2980b9',
        backgroundColor: type === 'Venta' ? '#e8f8f0' : '#eaf2f8',
        padding: '3px 8px', borderRadius: '4px', alignSelf: 'flex-start'
      }}>
        {type}
      </span>

      <h3 style={{ margin: 0, fontSize: '18px', color: '#2c3e50' }}>{title}</h3>
      <p style={{ margin: 0, color: '#7f8c8d', fontSize: '14px' }}>📍 {location}</p>
      
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f2f2f2', marginBottom: '10px'
      }}>
        <strong style={{ fontSize: '16px', color: '#2c3e50' }}>
          ${price.toLocaleString('es-CO')}
        </strong>
        <span style={{ fontSize: '13px', color: '#7f8c8d' }}>{area} m²</span>
      </div>

      {/* Botón dinámico para ir al detalle extendido */}
      <Link to={`/properties/${id}`} style={{
        backgroundColor: '#2c3e50',
        color: '#fff',
        textDecoration: 'none',
        textAlign: 'center',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '13px',
        fontWeight: 'bold'
      }}>
        Ver Detalles
      </Link>
    </div>
  );
}

export default PropertyCard;