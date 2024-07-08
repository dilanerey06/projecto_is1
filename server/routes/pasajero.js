const express = require('express');
const router = express.Router();
const { db } = require('../config/Conection');

// Realizar reporte
router.post('/reporte', (req, res) => {
  const { nombre_pasajero, numero_bus, descripcion } = req.body;
  console.log(req.body);
  if (descripcion.length > 255) {  // Ajusta este límite según tus necesidades
    res.status(400).json({ message: "La descripción excede el límite de caracteres" });
    return;
  }
  //const sqlInsert = "INSERT INTO reporte(nombre_pasajero, bus_numero, descripcion) VALUES (?, ?, ?)"
  const sqlInsert = "INSERT INTO reporte(bus_numero, descripcion) VALUES (?, ?)"
  //const sqlInsert = `INSERT INTO reporte(nombre_pasajero, bus_numero, descripcion) VALUES (${nombre_pasajero}, ${numero_bus}, "${descripcion}");`;
  console.log(sqlInsert);
  db.query(sqlInsert,[numero_bus, descripcion], (err, result) => {
    if (err) {
      console.log(err.message)
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: "Reporte creado", id: result.insertId, nombre_pasajero, numero_bus, descripcion });
  });
});

module.exports = router;