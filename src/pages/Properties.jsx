const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Tu conexión a MySQL
const verificarToken = require('../middleware/authMiddleware'); // Tu middleware de JWT

// 🗑️ 1. RUTA PARA ELIMINAR PROPIEDAD (CON OWNER_ID REAL)
router.delete('/:id', verificarToken, async (req, res) => {
  const propiedadId = req.params.id;
  const usuarioId = req.user.id; // ID extraído del Token JWT por tu middleware

  try {
    // 🚀 Corregido a owner_id según la base de datos
    const [resultado] = await db.query(
      'DELETE FROM propiedades WHERE id = ? AND owner_id = ?',
      [propiedadId, usuarioId]
    );

    if (resultado.affectedRows === 0) {
      return res.status(403).json({ 
        message: "No tienes permiso para eliminar esta propiedad o el inmueble no existe." 
      });
    }

    return res.json({ message: "Propiedad eliminada correctamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al eliminar." });
  }
});

// ✏️ 2. RUTA PARA EDITAR PROPIEDAD (CON OWNER_ID REAL)
router.put('/:id', verificarToken, async (req, res) => {
  const propiedadId = req.params.id;
  const usuarioId = req.user.id;
  const { titulo, descripcion, precio, ubicacion } = req.body;

  try {
    const [resultado] = await db.query(
      'UPDATE propiedades SET titulo = ?, descripcion = ?, precio = ?, ubicacion = ? WHERE id = ? AND owner_id = ?',
      [titulo, descripcion, precio, ubicacion, propiedadId, usuarioId]
    );

    if (resultado.affectedRows === 0) {
      return res.status(403).json({ 
        message: "No puedes editar esta propiedad porque no te pertenece." 
      });
    }

    return res.json({ message: "Propiedad actualizada con éxito." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al editar." });
  }
});

module.exports = router;