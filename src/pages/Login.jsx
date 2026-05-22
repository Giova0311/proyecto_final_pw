import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // 🚀 Importamos Link para la navegación directa

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      // Petición real al servidor local de Node.js
      const respuesta = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.message || "Error al iniciar sesión.");
      }

      // Si todo sale bien, guardamos el Token JWT y los datos del usuario
      localStorage.setItem("token", datos.access_token);
      localStorage.setItem("user", JSON.stringify(datos.user));

      // Redirección inteligente según el rol guardado en la base de datos
      if (datos.user.role === "owner" || datos.user.role === "admin") {
        navigate("/properties");
      } else {
        navigate("/");
      }

      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "25px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{ color: "#2c3e50", textAlign: "center", marginBottom: "10px" }}
      >
        Iniciar Sesión
      </h2>
      <p
        style={{
          color: "#7f8c8d",
          fontSize: "13px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Smart Estate - Portal Real
      </p>

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "4px",
            fontSize: "14px",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <form
        onSubmit={manejarLogin}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            required
            placeholder="ejemplo@estate.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={cargando}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            Contraseña
          </label>
          <input
            type="password"
            required
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={cargando}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          style={{
            backgroundColor: cargando ? "#bdc3c7" : "#3498db",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: cargando ? "not-allowed" : "pointer",
            fontSize: "15px",
            marginTop: "5px",
          }}
        >
          {cargando ? "Verificando..." : "Ingresar al Sistema"}
        </button>

        {/* 🚀 EL ENLACE CON <Link> SEGURO QUE SÍ MUEVE LA PÁGINA */}
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
            color: "#7f8c8d",
          }}
        >
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            style={{
              color: "#3498db",
              fontWeight: "bold",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
