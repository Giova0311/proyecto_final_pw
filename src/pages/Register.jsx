import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); // Por defecto se registra como cliente
  
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');
    setCargando(true);

    try {
      const respuesta = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.message || 'Error al registrar el usuario.');
      }

      setExito('🎉 ¡Usuario creado con éxito en MySQL! Redirigiéndote al login...');
      
      // Limpiar campos
      setName('');
      setEmail('');
      setPassword('');

      // Esperar 2 segundos para que el usuario vea el mensaje verde y redirigir
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '25px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '10px' }}>Crear Cuenta</h2>
      <p style={{ color: '#7f8c8d', fontSize: '13px', textAlign: 'center', marginBottom: '20px' }}>Únete a Smart Estate</p>

      {error && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>
          ⚠️ {error}
        </div>
      )}

      {exito && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '4px', fontSize: '14px', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' }}>
          {exito}
        </div>
      )}

      <form onSubmit={manejarRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Nombre Completo</label>
          <input 
            type="text" 
            required 
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={cargando}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Correo Electrónico</label>
          <input 
            type="email" 
            required 
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={cargando}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>Contraseña</label>
          <input 
            type="password" 
            required 
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={cargando}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>¿Qué tipo de usuario eres?</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            disabled={cargando}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', boxSizing: 'border-box' }}
          >
            <option value="client">Cliente (Quiero buscar inmuebles)</option>
            <option value="owner">Propietario (Quiero publicar inmuebles)</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={cargando}
          style={{ 
            backgroundColor: cargando ? '#bdc3c7' : '#2ecc71', 
            color: '#fff', 
            padding: '10px', 
            border: 'none', 
            borderRadius: '4px', 
            fontWeight: 'bold', 
            cursor: cargando ? 'not-allowed' : 'pointer', 
            fontSize: '15px', 
            marginTop: '5px' 
          }}
        >
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}

export default Register;