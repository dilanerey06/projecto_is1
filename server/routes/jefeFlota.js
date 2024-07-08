const express = require('express');
const router = express.Router();
const { db } = require('../config/Conection');

// Buscar un bus
router.get('/bus/:numero_bus', (req, res) => {
  const sqlSelect = "SELECT * FROM bus WHERE numero_bus = ?";
  db.query(sqlSelect, [req.params.numero_bus], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Bus no encontrado" });
      return;
    }
    res.status(200).json(result[0]);
  });
});

// Agregar un bus a la flota
router.post('/bus', (req, res) => {
  const { numero_bus, modelo, en_servicio } = req.body;
  const sqlInsert = "INSERT INTO bus (numero_bus, modelo, en_servicio) VALUES (?, ?, ?)";
  db.query(sqlInsert, [numero_bus, modelo, en_servicio], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ numero_bus, modelo, en_servicio });
  });
});

// Asignar conductor a bus
router.put('/asignar-conductor', (req, res) => {
  const { id_conductor, numero_bus } = req.body;
  const sqlUpdate = "UPDATE conductor SET bus_asignado = ? WHERE id = ?";
  db.query(sqlUpdate, [numero_bus, id_conductor], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Conductor no encontrado" });
      return;
    }
    res.status(200).json({ message: "Conductor asignado al bus", id_conductor, numero_bus });
  });
});

// Registrar nuevo conductor
router.post('/conductor', (req, res) => {
  const { nombre, num_licencia } = req.body;
  const sqlInsert = "INSERT INTO conductor (nombre, num_licencia) VALUES (?, ?)";
  db.query(sqlInsert, [nombre, num_licencia], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: result.insertId, nombre, num_licencia });
  });
});

// Cambiar estado de bus
router.put('/cambiar-estado-bus/:numero_bus', (req, res) => {
  const { en_servicio } = req.body;
  const { numero_bus } = req.params;
  
  const sqlUpdate = "UPDATE bus SET en_servicio = ? WHERE numero_bus = ?";
  db.query(sqlUpdate, [en_servicio, numero_bus], (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Bus no encontrado" });
      return;
    }
    res.status(200).json({ message: "Estado del bus actualizado", numero_bus, en_servicio });
  });
});

// Ver información de todos los buses en la flota
router.get('/buses', (req, res) => {
  const sqlSelect = "SELECT * FROM bus";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(result);
  });
});

// Ver reportes de un bus específico
router.get('/reportes/:numero_bus', (req, res) => {
  const sqlSelect = "SELECT * FROM reporte WHERE bus_numero = ?";
  db.query(sqlSelect, [req.params.numero_bus], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(result);
  });
});

// Ver reportes de todos los buses
router.get('/reportes', (req, res) => {
  const sqlSelect = "SELECT * FROM reporte";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(result);
  });
});

// Ver listado de conductores
router.get('/conductores', (req, res) => {
  const sqlSelect = "SELECT * FROM conductor";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(result);
  });
});

module.exports = router;