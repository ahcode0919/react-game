import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Game from './components/game';

const App = () => (
  <Container className="app" fluid="true">
    <Navbar fixed="top">
      <Navbar.Brand href="#" className="text-light">
        Tic-Tac-Toe
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link
            className="text-light"
            href="https://github.com/ahcode0919/react-game"
          >
            Github
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <Game />
      </Col>
    </Row>
  </Container>
);

export default App;
