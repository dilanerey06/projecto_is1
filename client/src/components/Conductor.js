// import React from 'react';
// import { Container, Button } from 'react-bootstrap';
// import { useNavigate  } from 'react-router-dom';

// function Conductor() {
//   const history = useNavigate ();
//   const redirect = path => {
//     history(path);
//   };
//   return (
//     <Container className="text-center mt-5">
//       <h2>Componente Conductor</h2>
//       <Button variant="secondary" onClick={() => redirect('/')}>
//         Volver
//       </Button>
//     </Container>
//   );
// }

// export default Conductor;

// import React, { useEffect, useState } from 'react';
// import { Container, Button, Form, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// function Conductor() {
//   // Estados para manejar los datos del conductor, bus, descripción del reporte, errores y mensajes de éxito
//   const [conductor, setConductor] = useState(null);
//   const [bus, setBus] = useState(null);
//   const [descripcion, setDescripcion] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   // useEffect se ejecuta cuando el componente se monta para obtener los datos del conductor y del bus asignado
//   useEffect(() => {
//     const fetchConductorData = async () => {
//       try {
//         // Solicita la información del conductor con id 1 desde la API
//         const conductorResponse = await fetch('http://localhost:8080/api/conductor/1');
//         if (!conductorResponse.ok) throw new Error('Error al obtener los datos del conductor');
//         const conductorData = await conductorResponse.json();
//         setConductor(conductorData);

//         // Si el conductor tiene un bus asignado, solicita la información de ese bus
//         if (conductorData.bus_asignado) {
//           const busResponse = await fetch(`http://localhost:8080/api/bus/${conductorData.bus_asignado}`);
//           if (!busResponse.ok) throw new Error('Error al obtener los datos del bus');
//           const busData = await busResponse.json();
//           setBus(busData);
//         }
//       } catch (err) {
//         // Maneja errores en la solicitud y muestra un mensaje de error
//         setError('Error al obtener los datos del conductor.');
//       }
//     };

//     fetchConductorData();
//   }, []);

//   // Maneja el envío del formulario para crear un nuevo reporte
//   const handleReporteSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setSuccess('');

//     // Verifica que la descripción no esté vacía
//     if (!descripcion) {
//       setError('La descripción es requerida.');
//       return;
//     }

//     try {
//       // Envía la solicitud para crear un nuevo reporte asociado al conductor y su bus asignado
//       const response = await fetch('http://localhost:8080/api/conductor/reporte', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id_conductor: conductor.id,
//           descripcion,
//         }),
//       });

//       if (!response.ok) throw new Error('Error al crear el reporte');

//       const result = await response.json();
//       setSuccess('Reporte creado exitosamente.');
//       setDescripcion(''); // Limpia el campo de descripción después de enviar el reporte
//     } catch (err) {
//       // Maneja errores en la solicitud y muestra un mensaje de error
//       setError('Error al crear el reporte.');
//     }
//   };

//   return (
//     <Container className="text-center mt-5">
//       <h2>Componente Conductor</h2>
//       {/* Muestra mensajes de error y éxito */}
//       {/* {error && <Alert variant="danger">{error}</Alert>} */}
//       {success && <Alert variant="success">{success}</Alert>}
//       {conductor ? (
//         <>
//           {/* Muestra la información del conductor */}
//           <h3>{conductor.nombre}</h3>
//           <p>Licencia: {conductor.num_licencia}</p>
//           {bus ? (
//             <>
//               {/* Muestra la información del bus asignado si existe */}
//               <h4>Bus Asignado</h4>
//               <p>Modelo: {bus.modelo}</p>
//               <p>En servicio: {bus.en_servicio ? 'Sí' : 'No'}</p>
//               {/* Formulario para crear un nuevo reporte */}
//               <Form onSubmit={handleReporteSubmit}>
//                 <Form.Group controlId="descripcion">
//                   <Form.Label>Descripción del Reporte</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     value={descripcion}
//                     onChange={(e) => setDescripcion(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" className="mt-3">
//                   Crear Reporte
//                 </Button>
//               </Form>
//             </>
//           ) : (           
//             <Alert variant="danger">No tiene ningún bus asignado.</Alert>
//           )}
//         </>
//       ) : (
//         <p>Cargando información del conductor...</p>
//       )}
//       {/* Botón para volver a la página principal */}
//       <Button variant="secondary" onClick={() => navigate('/')}>
//         Volver
//       </Button>
//     </Container>
//   );
// }

// export default Conductor;

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