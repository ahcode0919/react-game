import React from 'react';
import { Container, Jumbotron, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Game from './components/game';

const App = () => (
  <Container className="bg-secondary app" fluid="true">
    <Navbar bg="dark" fixed="top">
      <Navbar.Brand href="#" className="text-light">Tic-Tac-Toe</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link className="text-light" href="https://github.com/ahcode0919/react-game">Github</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Game />
        </Col>
      </Row>
  </Container>
);

export default App;