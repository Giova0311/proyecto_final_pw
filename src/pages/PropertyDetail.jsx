import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propiedad, setPropiedad] = useState(null);
  const [error, setError] = useState('');

  const usuarioLocal = JSON.parse(localStorage.getItem('user'));
  const usuarioLogueadoId = usuarioLocal?.id;
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPropiedad(data);
      })
      .catch((err) => console.error("Error al cargar la propiedad:", err));
  }, [id]);

  const manejarEliminar = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar permanentemente esta publicación?")) return;

    try {
      const respuesta = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.message);

      alert("Publicación eliminada correctamente.");
      navigate('/properties'); 
    } catch (err) {
      setError(err.message);
    }
  };

  const manejarEditar = () => {
    navigate(`/edit-property/${id}`);
  };

  if (!propiedad) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando detalles de la propiedad...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
      
      {error && <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>⚠️ {error}</div>}
      
      <h1 style={{ color: '#2c3e50' }}>{propiedad.titulo}</h1>
      <p style={{ fontSize: '18px', color: '#27ae60', fontWeight: 'bold' }}>Precio: ${propiedad.precio}</p>
      <p style={{ color: '#7f8c8d' }}>📍 Ubicación: {propiedad.ubicacion}</p>
      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
      <p style={{ lineHeight: '1.6', color: '#34495e' }}>{propiedad.descripcion}</p>

      {/* 🚀 CORREGIDO: Ahora compara contra owner_id */}
      {usuarioLogueadoId === propiedad.owner_id && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '30px', borderTop: '2px dashed #eee', paddingTop: '20px' }}>
          <button onClick={manejarEditar} style={{ flex: 1, backgroundColor: '#f1c40f', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
            ✏️ Editar Publicación
          </button>
          <button onClick={manejarEliminar} style={{ flex: 1, backgroundColor: '#e74c3c', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
            🗑️ Eliminar Propiedad
          </button>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;