import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProperty() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Estados del Formulario
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [type, setType] = useState('Venta');
  const [description, setDescription] = useState('');
  
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('user'));
    if (!usuarioLogueado || (usuarioLogueado.role !== 'owner' && usuarioLogueado.role !== 'admin')) {
      navigate('/login');
    } else {
      setUser(usuarioLogueado);
    }
  }, [navigate]);

  const manejarPublicacion = async (e) => {
    e.preventDefault();
    setError('');
    setExito(false);
    setCargando(true);

    try {
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          price: parseFloat(price),
          location,
          area: parseInt(area),
          type,
          description,
          owner_id: user.id // Captura dinámicamente tu ID desde la sesión activa
        })
      });

      const datos = await response.json();

      if (!response.ok) {
        throw new Error(datos.message || 'No se pudo publicar la propiedad.');
      }

      setExito(true);
      // Limpiar Formulario
      setTitle('');
      setPrice('');
      setLocation('');
      setArea('');
      setDescription('');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: '650px', margin: '30px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '5px' }}>Publicar Nuevo Inmueble Real</h2>
      <p style={{ color: '#7f8c8d', marginBottom: '25px', fontSize: '14px' }}>Propietario: <strong>{user.name}</strong></p>

      {exito && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px', marginBottom: '20px', fontWeight: 'bold' }}>
          🎉 ¡Anuncio guardado con éxito en MySQL! Ya está disponible en el catálogo de propiedades.
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', fontSize: '14px', marginBottom: '15px' }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={manejarPublicacion} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', backgroundColor: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <div style={{ gridColumn: '1 / span 2' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Título del Anuncio</label>
          <input type="text" required disabled={cargando} value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} placeholder="Ej: Penthouse con vista panorámica" />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Precio (COP)</label>
          <input type="number" required disabled={cargando} value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} placeholder="Ej: 320000000" />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Área (m²)</label>
          <input type="number" required disabled={cargando} value={area} onChange={(e) => setArea(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} placeholder="Ej: 72" />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Ubicación</label>
          <input type="text" required disabled={cargando} value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} placeholder="Ej: El Rodadero" />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Tipo de Oferta</label>
          <select value={type} disabled={cargando} onChange={(e) => setType(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', boxSizing: 'border-box' }}>
            <option value="Venta">Venta</option>
            <option value="Arriendo">Arriendo</option>
          </select>
        </div>

        <div style={{ gridColumn: '1 / span 2' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Descripción Ampliada</label>
          <textarea rows="4" disabled={cargando} value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical', boxSizing: 'border-box' }} placeholder="Detalles sobre alcobas, baños, zonas sociales..."></textarea>
        </div>

        <button type="submit" disabled={cargando} style={{ gridColumn: '1 / span 2', backgroundColor: cargando ? '#bdc3c7' : '#27ae60', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: cargando ? 'not-allowed' : 'pointer', fontSize: '16px', marginTop: '10px' }}>
          {cargando ? 'Guardando en Base de Datos...' : 'Guardar y Publicar Inmueble'}
        </button>
      </form>
    </div>
  );
}

export default AddProperty;