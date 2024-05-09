import './Navbar.css';

import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand>
          <img src="./public/logo.png" alt="Logo" />
          App Usuarios</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-end align-items-md-center">
            <NavLink
              className={({ isActive }) => (isActive ? 'link active' : 'link')}
              to={'/'}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link active' : 'link')}
              to={'/dashboard'}
            >
              Dashboard
            </NavLink>
            <Link to={'/'} className="ms-4 mt-3 mt-md-0">
              <Button variant="outline-danger">Cerrar Sesión</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
