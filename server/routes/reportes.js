const express = require('express');
const router = express.Router();
const { db } = require('../config/Conection');

// Obtener todos los reportes
router.get('/', (req, res) => {
  const sqlSelect = "SELECT * FROM reporte";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(result);
  });
});

// Obtener un reporte específico
router.get('/:id', (req, res) => {
  const sqlSelect = "SELECT * FROM reporte WHERE id = ?";
  db.query(sqlSelect, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Reporte no encontrado" });
      return;
    }
    res.status(200).json(result[0]);
  });
});

// Crear un nuevo reporte
router.post('/', (req, res) => {
  const { descripcion, bus_numero } = req.body;
  const sqlInsert = "INSERT INTO reporte (descripcion, bus_numero) VALUES (?, ?)";
  db.query(sqlInsert, [descripcion, bus_numero], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: result.insertId, descripcion, bus_numero });
  });
});

module.exports = router;