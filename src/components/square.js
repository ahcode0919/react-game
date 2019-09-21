import React from 'react';
import { Button, Col } from 'react-bootstrap';

export function getClassName(winner) {
  return winner ? 'winning-square square' : 'square';
}

export default function Square(props) {
  return (
    <Col xs={4} fluid="true">
      <Button
        fluid="true"
        className={getClassName(props.winner)}
        onClick={() => props.onClick()}
        variant="outline-light"
      >
        <p className="text">{props.value}</p>
      </Button>
    </Col>
  );
}
