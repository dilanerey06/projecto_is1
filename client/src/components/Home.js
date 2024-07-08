import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <Container className="text-center mt-5">
      <h1>Página de Inicio</h1>
      <Row className="mt-4">
        <Col>
          <Button variant="primary" size="lg">
            <Link to="/pasajero" style={{ color: 'white', textDecoration: 'none' }}>Pasajero</Link>
          </Button>
        </Col>
        <Col>
          <Button variant="success" size="lg">
            <Link to="/conductor" style={{ color: 'white', textDecoration: 'none' }}>Conductor</Link>
          </Button>
        </Col>
        <Col>
          <Button variant="warning" size="lg">
            <Link to="/jefe-de-flota" style={{ color: 'white', textDecoration: 'none' }}>Jefe de Flota</Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;