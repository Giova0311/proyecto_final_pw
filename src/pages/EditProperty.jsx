import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [valores, setValores] = useState({ titulo: '', descripcion: '', precio: '', ubicacion: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // Cargar datos actuales de la propiedad para rellenar el formulario
  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setValores({ titulo: data.titulo, descripcion: data.descripcion, precio: data.precio, ubicacion: data.ubicacion }))
      .catch((err) => console.error("Error al precargar:", err));
  }, [id]);

  const manejarCambioInput = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const respuesta = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(valores)
      });

      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.message);

      alert("¡Publicación actualizada perfectamente!");
      navigate(`/properties/${id}`); // Regresa a ver el detalle actualizado
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '25px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px', textAlign: 'center' }}>✏️ Modificar Publicación</h2>
      
      {error && <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>⚠️ {error}</div>}

      <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '13px', marginBottom: '5px' }}>Título del Inmueble</label>
          <input type="text" name="titulo" value={valores.titulo} onChange={manejarCambioInput} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '13px', marginBottom: '5px' }}>Ubicación / Ciudad</label>
          <input type="text" name="ubicacion" value={valores.ubicacion} onChange={manejarCambioInput} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '13px', marginBottom: '5px' }}>Precio ($)</label>
          <input type="number" name="precio" value={valores.precio} onChange={manejarCambioInput} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '13px', marginBottom: '5px' }}>Descripción del Inmueble</label>
          <textarea name="descripcion" rows="4" value={valores.descripcion} onChange={manejarCambioInput} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', resize: 'none' }} />
        </div>

        <button type="submit" disabled={cargando} style={{ backgroundColor: cargando ? '#bdc3c7' : '#27ae60', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>
          {cargando ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}

export default EditProperty;