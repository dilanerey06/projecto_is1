
import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Conductor() {
  const navigate = useNavigate();
  const [conductor, setConductor] = useState(null);
  const [bus, setBus] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Obtener información del conductor (usando ID 1 como ejemplo)
    axios.get('http://localhost:8080/api/conductor/1')
      .then(response => {
        setConductor(response.data);
        if (response.data.bus_asignado) {
          // Si tiene bus asignado, obtener información del bus
          axios.get(`http://localhost:8080/api/jefe-flota/bus/${response.data.bus_asignado}`)
            .then(busResponse => {
              setBus(busResponse.data);
            })
            .catch(error => console.error('Error al obtener información del bus:', error));
        }
      })
      .catch(error => console.error('Error al obtener información del conductor:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bus) {
      setMensaje('No puedes hacer un reporte sin un bus asignado.');
      return;
    }
    axios.post('http://localhost:8080/api/conductor/reporte', {
      id_conductor: conductor.id,
      descripcion: descripcion
    })
      .then(response => {
        setMensaje('Reporte enviado con éxito');
        setDescripcion('');
      })
      .catch(error => {
        console.error('Error al enviar reporte:', error);
        setMensaje('Error al enviar el reporte');
      });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Panel del Conductor</h2>
      {conductor && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>{conductor.nombre}</Card.Title>
            <Card.Text>
              Número de Licencia: {conductor.num_licencia}
              <br />
              Bus Asignado: {bus ? bus.modelo : 'No asignado'}
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {bus && (
        <Form onSubmit={handleSubmit} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Reporte de Bus</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe el problema del bus"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar Reporte
          </Button>
        </Form>
      )}

      {mensaje && <Alert variant={mensaje.includes('éxito') ? 'success' : 'danger'}>{mensaje}</Alert>}

      <Button variant="secondary" onClick={() => navigate('/')}>
        Volver al Inicio
      </Button>
    </Container>
  );
}

export default Conductor;
