import React, { useState } from "react";

function Contact() {
  // Estados para controlar los campos del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEnviado(false);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, mensaje }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar mensaje");
      }

      setEnviado(true);
      setNombre("");
      setCorreo("");
      setMensaje("");
    } catch (err) {
      alert("⚠️ " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "10px" }}>Contáctanos</h2>
      <p style={{ color: "#7f8c8d", marginBottom: "25px" }}>
        ¿Tienes dudas sobre alguna propiedad o quieres publicar tu inmueble?
        Déjanos tu mensaje.
      </p>

      {enviado && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          ¡Mensaje recibido! Un asesor se pondrá en contacto contigo muy pronto.
        </div>
      )}

      <form
        onSubmit={manejarEnvio}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Nombre Completo
          </label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            placeholder="juan@correo.com"
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Mensaje o Consulta
          </label>
          <textarea
            rows="5"
            required
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
            placeholder="Estoy interesado en el apartamento del Centro Histórico..."
          ></textarea>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#2c3e50",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}

export default Contact;
