import React from 'react';
import Square from './square';
import { Row } from 'react-bootstrap';

export function isWinner(squareNumber, props) {
  if (!props.winningSquares) {
    return false;
  }
  return props.winningSquares.includes(squareNumber);
}

export default class Board extends React.Component {
  static renderSquare(squareNumber, props) {
    return (
      <Square
        key={`square-${squareNumber}`}
        value={props.squares[squareNumber]}
        onClick={() => props.onClick(squareNumber)}
        winner={isWinner(squareNumber, props)}
      />
    );
  }

  render() {
    let rows = [];
    let count = 0;

    for (let i = 0; i < 3; i++) {
      let squares = [];
      for (let j = 0; j < 3; j++) {
        squares.push(Board.renderSquare(count, this.props));
        count += 1;
      }
      rows[i] = (
        <Row noGutters="true" key={`row-${i}`} className="board-row">
          {squares}
        </Row>
      );
    }
    return <div>{rows}</div>;
  }
}
