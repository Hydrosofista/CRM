import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Usuń token z localStorage
    localStorage.removeItem('authToken');
    console.log('Wylogowano');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('authToken');

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          CRM App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Strona Główna
            </Nav.Link>
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/clients">
                  Lista Klientów
                </Nav.Link>
                <Nav.Link as={Link} to="/add-client">
                  Dodaj Klienta
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Button variant="outline-light" onClick={handleLogout}>
                Wyloguj
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login">
                Zaloguj
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

