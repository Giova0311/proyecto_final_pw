import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtros
  const [searchLocation, setSearchLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filterType, setFilterType] = useState('Todos');

  // Traer los datos reales desde el Backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        const resData = await response.json();
        if (response.ok) {
          setProperties(resData.data);
        } else {
          throw new Error(resData.message || 'Error al cargar catálogo');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Lógica de filtrado en tiempo real
  const filteredProperties = properties.filter((item) => {
    const matchLocation = item.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchPrice = maxPrice === '' || parseFloat(item.price) <= parseFloat(maxPrice);
    const matchType = filterType === 'Todos' || item.type === filterType;
    return matchLocation && matchPrice && matchType;
  });

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Cargando catálogo real...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Catálogo de Propiedades Reales</h2>
      
      {/* Barra de Filtros */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e0e0e0' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Ubicación</label>
          <input type="text" placeholder="Ej: Centro" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Precio Máximo</label>
          <input type="number" placeholder="Ej: 300000000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Tipo</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
            <option value="Todos">Todos</option>
            <option value="Venta">Venta</option>
            <option value="Arriendo">Arriendo</option>
          </select>
        </div>
      </div>

      {/* Grid de Tarjetas */}
      {filteredProperties.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>No se encontraron inmuebles con los filtros seleccionados.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Properties;