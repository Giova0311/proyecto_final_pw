import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const usuarioLogueado = localStorage.getItem('user');

  // Si no está logueado, lo manda al login. Si sí, renderiza la ruta hija (Outlet)
  return usuarioLogueado ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;