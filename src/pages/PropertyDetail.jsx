import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Volvemos a mapear los datos (luego vendrán de la base de datos)
const BASE_INMUEBLES = [
  { id: 1, title: 'Apartamento Amoblado Centro', price: 250000000, location: 'Centro Histórico', area: 65, type: 'Venta', desc: 'Hermoso apartamento con acabados de lujo, excelente iluminación natural y seguridad 24/7 en el corazón de la ciudad.' },
  { id: 2, title: 'Casa Campestre con Piscina', price: 680000000, location: 'Zona Norte', area: 180, type: 'Venta', desc: 'Espaciosa casa campestre ideal para el descanso familiar. Cuenta con amplias zonas verdes, piscina privada y parqueadero para 4 vehículos.' },
  { id: 3, title: 'Apartamento Vista al Mar', price: 3500000, location: 'El Rodadero', area: 85, type: 'Arriendo', desc: 'Despierta con la mejor brisa marina. Apartamento totalmente equipado, balcón amplio con vista directa al mar y acceso privado a la playa.' },
  { id: 4, title: 'Local Comercial Plaza Principal', price: 4500000, location: 'Centro Histórico', area: 45, type: 'Arriendo', desc: 'Local con alto flujo peatonal, vitrina de vidrio templado de piso a techo, un baño privado y mezanina para bodega.' },
];

function PropertyDetail() {
  const { id } = useParams();
  // Buscar el inmueble que coincida con el ID de la URL
  const inmueble = BASE_INMUEBLES.find(item => item.id === parseInt(id));

  if (!inmueble) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Inmueble no encontrado</h2>
        <Link to="/properties" style={{ color: '#3498db' }}>Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Link to="/properties" style={{ display: 'inline-block', marginBottom: '20px', color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>
        ← Volver al Catálogo
      </Link>

      <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ backgroundColor: inmueble.type === 'Venta' ? '#e8f8f0' : '#eaf2f8', color: inmueble.type === 'Venta' ? '#27ae60' : '#2980b9', padding: '5px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>
            {inmueble.type}
          </span>
          <strong style={{ fontSize: '22px', color: '#2c3e50' }}>${inmueble.price.toLocaleString('es-CO')}</strong>
        </div>

        <h1 style={{ color: '#2c3e50', margin: '0 0 10px 0', fontSize: '28px' }}>{inmueble.title}</h1>
        <p style={{ fontSize: '16px', color: '#7f8c8d', margin: '0 0 20px 0' }}>📍 {inmueble.location} — 📐 {inmueble.area} m²</p>
        
        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
        
        <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Descripción del Inmueble</h3>
        <p style={{ color: '#555', lineHeight: '1.6', fontSize: '15px' }}>{inmueble.desc}</p>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '6px', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>¿Te interesa esta propiedad?</h4>
          <Link to="/contact" style={{ display: 'inline-block', backgroundColor: '#2c3e50', color: '#fff', padding: '10px 25px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
            Contactar Agente
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;