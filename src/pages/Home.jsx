import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Sección Principal (Hero) */}
      <div style={{ 
        backgroundColor: '#2c3e50', 
        color: '#fff', 
        padding: '50px 30px', 
        borderRadius: '10px', 
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '36px', margin: '0 0 15px 0' }}>Encuentra tu próximo hogar ideal</h1>
        <p style={{ fontSize: '18px', color: '#bdc3c7', marginBottom: '25px' }}>
          La plataforma más rápida y confiable para comprar, vender o arrendar bienes raíces.
        </p>
        <Link to="/properties" style={{
          backgroundColor: '#3498db',
          color: '#fff',
          padding: '12px 25px',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
          display: 'inline-block',
          transition: 'background 0.2s'
        }}>
          Explorar Catálogo
        </Link>
      </div>

      {/* Grid de Características/Servicios */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0 }}>🔍 Filtros Avanzados</h3>
          <p style={{ color: '#7f8c8d', margin: 0, fontSize: '14px' }}>
            Busca propiedades por su ubicación, precio y tipo de oferta de manera instantánea y sin recargar la página.
          </p>
        </div>

        <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0 }}>💼 Para Propietarios</h3>
          <p style={{ color: '#7f8c8d', margin: 0, fontSize: '14px' }}>
            Publica tus inmuebles, gestiona tus anuncios y accede a planes de suscripción para destacar tus ofertas sobre las demás.
          </p>
        </div>

        <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0 }}>🔒 Seguridad Completa</h3>
          <p style={{ color: '#7f8c8d', margin: 0, fontSize: '14px' }}>
            Conectamos a clientes con agentes inmobiliarios certificados de forma directa y transparente.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Home;