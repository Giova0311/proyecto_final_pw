import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const token = localStorage.getItem("token");

  // Obtener propiedad por ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.error("Error al cargar la propiedad:", err));
  }, [id]);

  // Eliminar propiedad (ruta corregida)
  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar esta propiedad?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/owner/properties/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Propiedad eliminada correctamente.");
      navigate("/properties");
    } catch (err) {
      setError(err.message);
    }
  };

  // Redirigir a edición
  const handleEdit = () => {
    navigate(`/edit-property/${id}`);
  };

  if (!property)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Cargando detalles...
      </p>
    );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <h1>{property.title}</h1>
      <p>
        <strong>💰 Precio:</strong> ${property.price}
      </p>
      <p>
        <strong>📍 Ubicación:</strong> {property.location}
      </p>
      <p>
        <strong>📐 Área:</strong> {property.area} m²
      </p>
      <p>
        <strong>🏷️ Tipo:</strong> {property.type}
      </p>
      <hr />
      <p>{property.description}</p>

      {/* Solo el dueño puede editar/eliminar */}
      {userId === property.owner_id && (
        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <button
            onClick={handleEdit}
            style={{
              flex: 1,
              backgroundColor: "#f1c40f",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ✏️ Editar
          </button>
          <button
            onClick={handleDelete}
            style={{
              flex: 1,
              backgroundColor: "#e74c3c",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🗑️ Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;
