import React from 'react'
import { useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
export const Prueba = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
        <Navbar collapseOnSelect expand="lg" bg="third" variant="white">
      <Container>
        <Navbar.Brand href="#home">Clínica Dental</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#inicio">Inicio</Nav.Link>
            <Nav.Link href="#citas">Citas</Nav.Link>
            <Nav.Link href="#pacientes">Pacientes</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
            <NavDropdown title="Servicios" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#limpieza">Limpieza</NavDropdown.Item>
              <NavDropdown.Item href="#blanqueamiento">Blanqueamiento</NavDropdown.Item>
              <NavDropdown.Item href="#ortodoncia">Ortodoncia</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


<h1>EOOOOOOOO</h1>

    </>
    )
}

export default Prueba;