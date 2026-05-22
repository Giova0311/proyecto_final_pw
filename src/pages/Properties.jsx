import React, { useEffect, useState } from "react";
import axios from "axios";

const btnStyles = {
  eliminar: {
    base: {
      flex: 1,
      backgroundColor: "#c0392b",
      color: "#fff",
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
      marginRight: "10px",
      transition: "transform 0.2s, background-color 0.2s",
    },
    hover: { backgroundColor: "#a93226", transform: "translateY(-2px)" },
  },
  editar: {
    base: {
      flex: 1,
      backgroundColor: "#d4a017",
      color: "#fff",
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.2s, background-color 0.2s",
    },
    hover: { backgroundColor: "#b8860b", transform: "translateY(-2px)" },
  },
  guardar: {
    base: {
      flex: 1,
      backgroundColor: "#1e8449",
      color: "#fff",
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.2s, background-color 0.2s",
    },
    hover: { backgroundColor: "#196f3d", transform: "translateY(-2px)" },
  },
  cancelar: {
    base: {
      flex: 1,
      backgroundColor: "#717d7e",
      color: "#fff",
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.2s, background-color 0.2s",
    },
    hover: { backgroundColor: "#5d6d7e", transform: "translateY(-2px)" },
  },
};

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      axios
        .get(`http://localhost:5000/api/owner/properties/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProperties(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  const eliminarPropiedad = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/api/owner/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() =>
        setProperties(properties.filter((property) => property.id !== id)),
      )
      .catch((err) => console.error(err));
  };

  const abrirEditor = (p) => {
    setEditando(p.id);
    setFormData({
      title: p.title,
      description: p.description,
      price: p.price,
      location: p.location,
      area: p.area,
      type: p.type,
    });
  };

  const guardarEdicion = (id) => {
    const token = localStorage.getItem("token");
    axios
      .put(`http://localhost:5000/api/owner/properties/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setProperties(
          properties.map((p) => (p.id === id ? { ...p, ...formData } : p)),
        );
        setEditando(null);
      })
      .catch((err) => console.error(err));
  };

  const inputStyle = {
    width: "100%",
    marginBottom: "8px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{ textAlign: "center", color: "#2c3e50", marginBottom: "20px" }}
      >
        Mis Propiedades
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {properties.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {editando === p.id ? (
              <div>
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Título"
                  style={inputStyle}
                />
                <input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descripción"
                  style={inputStyle}
                />
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="Precio"
                  style={inputStyle}
                />
                <input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Ubicación"
                  style={inputStyle}
                />
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  placeholder="Área (m²)"
                  style={inputStyle}
                />
                <input
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  placeholder="Tipo (Venta / Arriendo)"
                  style={{ ...inputStyle, marginBottom: "12px" }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => guardarEdicion(p.id)}
                    style={btnStyles.guardar.base}
                    onMouseEnter={(e) =>
                      Object.assign(e.target.style, btnStyles.guardar.hover)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.target.style, btnStyles.guardar.base)
                    }
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditando(null)}
                    style={btnStyles.cancelar.base}
                    onMouseEnter={(e) =>
                      Object.assign(e.target.style, btnStyles.cancelar.hover)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.target.style, btnStyles.cancelar.base)
                    }
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ color: "#34495e", marginBottom: "10px" }}>
                  {p.title}
                </h3>
                <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>
                  {p.description}
                </p>
                <p>
                  <strong>Precio:</strong> ${p.price}
                </p>
                <p>
                  <strong>Ubicación:</strong> {p.location}
                </p>
                <p>
                  <strong>Área:</strong> {p.area} m²
                </p>
                <p>
                  <strong>Tipo:</strong> {p.type}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() => eliminarPropiedad(p.id)}
                    style={btnStyles.eliminar.base}
                    onMouseEnter={(e) =>
                      Object.assign(e.target.style, btnStyles.eliminar.hover)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.target.style, btnStyles.eliminar.base)
                    }
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => abrirEditor(p)}
                    style={btnStyles.editar.base}
                    onMouseEnter={(e) =>
                      Object.assign(e.target.style, btnStyles.editar.hover)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.target.style, btnStyles.editar.base)
                    }
                  >
                    Editar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
