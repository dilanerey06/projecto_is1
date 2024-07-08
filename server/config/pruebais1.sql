CREATE DATABASE pruebais1;

USE pruebais1;

CREATE TABLE jefe_flota (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE bus (
    numero_bus INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(50) NOT NULL,
    en_servicio BOOLEAN DEFAULT FALSE
);

CREATE TABLE conductor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    num_licencia VARCHAR(20) NOT NULL,
    bus_asignado INT,
    FOREIGN KEY (bus_asignado) REFERENCES bus(numero_bus)
);

CREATE TABLE reporte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bus_numero INT,
    FOREIGN KEY (bus_numero) REFERENCES bus(numero_bus)
);

CREATE TABLE pasajero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

INSERT INTO jefe_flota (nombre) VALUES 
('Carlos Pérez'), 
('María González'),
('Juan Rodríguez');

INSERT INTO bus (modelo, en_servicio) VALUES 
('Mercedes-Benz Sprinter', TRUE),
('Volvo B9TL', FALSE),
('Scania K230UB', TRUE);

INSERT INTO conductor (nombre, num_licencia, bus_asignado) VALUES 
('Luis Martínez', 'AB12345', 1),
('Ana López', 'CD67890', 2),
('José Hernández', 'EF11223', 3);

INSERT INTO reporte (descripcion, bus_numero) VALUES 
('Falla en el sistema de aire acondicionado', 1),
('Neumático trasero derecho desgastado', 2),
('Ruido extraño en el motor', 1),
('Puerta trasera no cierra correctamente', 3);

INSERT INTO pasajero (nombre) VALUES 
('Pedro García'),
('Laura Fernández'),
('Miguel Torres');