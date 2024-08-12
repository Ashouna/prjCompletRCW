import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Headers.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Headers = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
            <Container>
                <img src="../titre.png" alt="chat" width="200" height="90" />

                <Navbar.Brand as={Link} to="/">Laura Santé</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                        <Nav.Link as={Link} to="/">Liste des Patients</Nav.Link>
                        <Nav.Link as={Link} to="/add">Ajouter un Patient</Nav.Link>
                        <NavDropdown title="Médecins" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/medecins">Liste des Médecins</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/addmedecin">Ajouter un Médecin</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Infirmiers" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/infirmiers">Liste des Infirmiers</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/addinfirmier">Ajouter un Infirmier</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Lits" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/lits">Liste des Lits</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/addlit">Ajouter un Lit</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Headers;
