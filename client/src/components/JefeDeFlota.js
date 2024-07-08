import { useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

function JefeFlota() {
  const history = useNavigate ();
  const redirect = path => {
    history(path);
  };
  const [buses, setBuses] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [busSeleccionado, setBusSeleccionado] = useState(null);
  const [nuevoBus, setNuevoBus] = useState({ modelo: '', en_servicio: false });
  const [asignacion, setAsignacion] = useState({ id_conductor: '', numero_bus: '' });

  useEffect(() => {
    cargarBuses();
    cargarConductores();
    cargarReportes();
  }, []);

  const cargarBuses = () => {
    axios.get('http://localhost:8080/api/jefe-flota/buses')
      .then(response => setBuses(response.data))
      .catch(error => console.error('Error al cargar buses:', error));
  };

  const cargarConductores = () => {
    axios.get('http://localhost:8080/api/jefe-flota/conductores')
      .then(response => setConductores(response.data))
      .catch(error => console.error('Error al cargar conductores:', error));
  };

  const cargarReportes = () => {
    axios.get('http://localhost:8080/api/jefe-flota/reportes')
      .then(response => setReportes(response.data))
      .catch(error => console.error('Error al cargar reportes:', error));
  };

  const agregarBus = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/jefe-flota/bus', nuevoBus)
      .then(response => {
        setMensaje('Bus agregado con éxito');
        cargarBuses();
        setNuevoBus({ modelo: '', en_servicio: false });
      })
      .catch(error => setMensaje('Error al agregar bus'));
  };

  const asignarConductor = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8080/api/jefe-flota/asignar-conductor', asignacion)
      .then(response => {
        setMensaje('Conductor asignado con éxito');
        cargarBuses();
        cargarConductores();
        setAsignacion({ id_conductor: '', numero_bus: '' });
      })
      .catch(error => setMensaje('Error al asignar conductor'));
  };

  const cambiarEstadoBus = (numero_bus, en_servicio) => {

    axios.put(`http://localhost:8080/api/jefe-flota/cambiar-estado-bus/${numero_bus}`, { en_servicio: !en_servicio })
      .then(response => {
        setMensaje('Estado del bus actualizado');
        // Actualizar el estado local del bus
        setBuses(buses.map(bus => 
          bus.numero_bus === numero_bus ? { ...bus, en_servicio: !en_servicio } : bus
        ));
      })
      .catch(error => {
        console.error('Error al cambiar estado del bus:', error);
        setMensaje('Error al cambiar estado del bus: ' + (error.response?.data?.message || error.message));
      });
  };

  const verInfoBus = (numero_bus) => {
    axios.get(`http://localhost:8080/api/jefe-flota/bus/${numero_bus}`)
      .then(response => setBusSeleccionado(response.data))
      .catch(error => setMensaje('Error al obtener información del bus'));
  };

  const verReportesBus = (numero_bus) => {
    axios.get(`http://localhost:8080/api/jefe-flota/reportes/${numero_bus}`)
      .then(response => {
        setReportes(response.data);
        setMensaje(`Mostrando reportes del bus ${numero_bus}`);
      })
      .catch(error => setMensaje('Error al obtener reportes del bus'));
  };

  const verTodosLosReportes = () => {
    cargarReportes();
    setMensaje('Mostrando todos los reportes');
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Panel del Jefe de Flota</h2>

      {mensaje && <Alert variant="info">{mensaje}</Alert>}

      <h3>Agregar Bus</h3>
      <Form onSubmit={agregarBus}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Modelo del bus"
            value={nuevoBus.modelo}
            onChange={(e) => setNuevoBus({...nuevoBus, modelo: e.target.value})}
            className='mb-3'
          />
        </Form.Group>
        <Form.Check 
          type="checkbox"
          label="En servicio"
          checked={nuevoBus.en_servicio}
          onChange={(e) => setNuevoBus({...nuevoBus, en_servicio: e.target.checked})}
          className='mb-3'
        />
        <Button type="submit">Agregar Bus</Button>
      </Form>

      <h3 className="mt-4">Asignar Conductor</h3>
      <Form onSubmit={asignarConductor}>
        <Form.Group>
          <Form.Control
            as="select"
            value={asignacion.id_conductor}
            onChange={(e) => setAsignacion({...asignacion, id_conductor: e.target.value})}
            className='mb-3'
          >
            <option value="">Seleccionar Conductor</option>
            {conductores.map(conductor => (
              <option key={conductor.id} value={conductor.id}>{conductor.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="select"
            value={asignacion.numero_bus}
            onChange={(e) => setAsignacion({...asignacion, numero_bus: e.target.value})}
            className='mb-3'
          >
            <option value="">Seleccionar Bus</option>
            {buses.map(bus => (
              <option key={bus.numero_bus} value={bus.numero_bus}>{bus.modelo}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button type="submit">Asignar Conductor</Button>
      </Form>

      <h3 className="mt-4">Buses de la Flota</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Número</th>
            <th>Modelo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {buses.map(bus => (
            <tr key={bus.numero_bus}>
              <td>{bus.numero_bus}</td>
              <td>{bus.modelo}</td>
              <td>{bus.en_servicio ? 'En servicio' : 'Fuera de servicio'}</td>
              <td>
                <Button variant="info" className="mx-3" onClick={() => verInfoBus(bus.numero_bus)}>Info</Button>
                <Button variant="info" className="mx-3" onClick={() => cambiarEstadoBus(bus.numero_bus, bus.en_servicio)}>Cambiar Estado</Button>
                <Button variant="info" className="mx-3" onClick={() => verReportesBus(bus.numero_bus)}>Ver Reportes</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {busSeleccionado && (
        <div>
          <h3>Información del Bus</h3>
          <p>Número: {busSeleccionado.numero_bus}</p>
          <p>Modelo: {busSeleccionado.modelo}</p>
          <p>Estado: {busSeleccionado.en_servicio ? 'En servicio' : 'Fuera de servicio'}</p>
        </div>
      )}

      <h3 className="mt-4">Reportes</h3>
      <Button variant="primary" onClick={verTodosLosReportes} className="mb-3">
        Ver todos los reportes
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Número de Bus</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map(reporte => (
            <tr key={reporte.id}>
              <td>{reporte.id}</td>
              <td>{reporte.descripcion}</td>
              <td>{new Date(reporte.fecha_creacion).toLocaleString()}</td>
              <td>{reporte.bus_numero}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="mt-4">Listado de Conductores</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Número de Licencia</th>
            <th>Bus Asignado</th>
          </tr>
        </thead>
        <tbody>
          {conductores.map(conductor => (
            <tr key={conductor.id}>
              <td>{conductor.id}</td>
              <td>{conductor.nombre}</td>
              <td>{conductor.num_licencia}</td>
              <td>{conductor.bus_asignado || 'No asignado'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="secondary" onClick={() => redirect('/')}>
        Volver al Inicio
      </Button>
    </Container>
  );
}

export default JefeFlota;