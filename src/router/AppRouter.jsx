import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Properties from '../pages/Properties.jsx';
import Contact from '../pages/Contact.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import PropertyDetail from '../pages/PropertyDetail.jsx'; 
import AddProperty from '../pages/AddProperty.jsx';  
import ProtectedRoute from '../components/ProtectedRoute.jsx';

function AppRouter() {
  return (
    <Routes>
      {/* 🔓 RUTAS PÚBLICAS: Cualquiera las puede ver sin loguearse */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/contact" element={<Contact />} />

      {/* 🔒 RUTAS PROTEGIDAS: Si no hay login, rebota automáticamente a /login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} /> 
        <Route path="/add-property" element={<AddProperty />} />     
      </Route>

      {/* El comodín al final */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;