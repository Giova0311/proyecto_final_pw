import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/properties/${id}`,
        );
        const data = await response.json();
        if (response.ok) {
          setProperty(data);
        } else {
          setProperty(null);
        }
      } catch (err) {
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Cargando detalles...
      </p>
    );
  }

  if (!property) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Inmueble no encontrado</h2>
        <Link to="/properties" style={{ color: "#3498db" }}>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Link
        to="/properties"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          color: "#3498db",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        ← Volver al Catálogo
      </Link>

      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <span
            style={{
              backgroundColor:
                property.type === "Venta" ? "#e8f8f0" : "#eaf2f8",
              color: property.type === "Venta" ? "#27ae60" : "#2980b9",
              padding: "5px 12px",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            {property.type}
          </span>
          <strong style={{ fontSize: "22px", color: "#2c3e50" }}>
            ${property.price.toLocaleString("es-CO")}
          </strong>
        </div>

        <h1
          style={{ color: "#2c3e50", margin: "0 0 10px 0", fontSize: "28px" }}
        >
          {property.title}
        </h1>
        <p style={{ fontSize: "16px", color: "#7f8c8d", margin: "0 0 20px 0" }}>
          📍 {property.location} — 📐 {property.area} m²
        </p>

        <hr
          style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }}
        />

        <h3 style={{ color: "#2c3e50", marginTop: "0" }}>
          Descripción del Inmueble
        </h3>
        <p style={{ color: "#555", lineHeight: "1.6", fontSize: "15px" }}>
          {property.description}
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>
            ¿Te interesa esta propiedad?
          </h4>
          <Link
            to="/contact"
            style={{
              display: "inline-block",
              backgroundColor: "#2c3e50",
              color: "#fff",
              padding: "10px 25px",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Contactar Agente
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
