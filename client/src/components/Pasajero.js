import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';

function Pasajero() {
  const history = useNavigate ();
  const redirect = path => {
    history(path);
  };
  const [nombre, setNombre] = useState('');
  const [numeroBus, setNumeroBus] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a una API
    console.log({ nombre, numeroBus, descripcion });
    let reqBody = {nombre_pasajero:nombre, numero_bus:numeroBus, descripcion:descripcion}
    enviarDatos("http://localhost:8080/api/pasajero/reporte",reqBody);
    setNombre('');
    setNumeroBus('');
    setDescripcion('');
  };

  async function enviarDatos(url, datos) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
  
    if (res.ok) {
      const resultado = await res.json();
      console.log(resultado);
    } else {
      console.error('Error:', res.status, "Message", res.error);
    }
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center">Panel del Pasajero</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNumeroBus" className="mt-3">
          <Form.Label>Número de Bus</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa el número de bus"
            value={numeroBus}
            onChange={(e) => setNumeroBus(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescripcion" className="mt-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingresa una descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Enviar
        </Button>
      </Form>

      <Button variant="secondary" onClick={() => redirect('/')} className="mt-3">
        Volver
      </Button>
    </Container>
  );
}

export default Pasajero;