const express = require('express');
const router = express.Router();
const { db } = require('../config/Conection');

// Obtener información del conductor
router.get('/:id', (req, res) => {
  console.log("entre a buscar conductor");
  const sqlSelect = "SELECT * FROM conductor WHERE id = ?";
  db.query(sqlSelect, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Conductor no encontrado" });
      return;
    }
    res.status(200).json(result[0]);
  });
});

//Obtener todos los conductores
router.get('/', (req, res) => {
  const sqlSelect = "SELECT * FROM conductor";
  db.query(sqlSelect, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "No hay conductores." });
      return;
    }
    res.status(200).json(result);
  });
});

// Realizar reporte de bus asociado
router.post('/reporte', (req, res) => {

  const { id_conductor, descripcion } = req.body;
  
  // Primero, obtenemos el bus asignado al conductor
  const sqlSelectBus = "SELECT bus_asignado FROM conductor WHERE id = ?";
  db.query(sqlSelectBus, [id_conductor], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Conductor no encontrado" });
      return;
    }
    const bus_numero = result[0].bus_asignado;
    
    // Luego, creamos el reporte
    const sqlInsertReporte = "INSERT INTO reporte (descripcion, bus_numero) VALUES (?, ?)";
    db.query(sqlInsertReporte, [descripcion, bus_numero], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: "Reporte creado", id: result.insertId, descripcion, bus_numero });
    });
  });
});

module.exports = router;