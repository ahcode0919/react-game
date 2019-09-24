import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const GAME_START_TEXT = 'Go to game start';

export function calculateColRow(lastMove) {
  if (lastMove === null) {
    return null;
  }
  let row = 1;
  let col = 1;

  for (let i = 0; i < lastMove; i++) {
    if (col === 3) {
      row += 1;
      col = 1;
      continue;
    }
    col += 1;
  }

  return {
    col: `${col}`,
    row: `${row}`,
  };
}

export function getMoves(props) {
  let moves = props.history.map((_, move) => {
    const colRow = calculateColRow(props.history[move].lastMove);
    let desc = move ? 'Go to move #' + move : GAME_START_TEXT;

    if (move === props.stepNumber) {
      desc = <b>{desc}</b>;
    }

    const moveInfo = {
      desc,
      move,
    };

    if (colRow) {
      moveInfo.col = colRow.col;
      moveInfo.row = colRow.row;
    }

    return moveInfo;
  });

  if (!props.sort) {
    moves = moves.reverse();
  }

  return moves;
}

export function getStatus(xIsNext, winningSquares) {
  if (winningSquares === undefined) {
    return (
      <Card className="status-message draw">
        <Card.Body>
          Draw!!!
        </Card.Body>
      </Card>
    );
  } else if (winningSquares) {
    return (
      <Card className="status-message win">
        <Card.Body>
          Winner{' '}
          <span role="img" aria-label="100">
            💯
          </span>
          : {xIsNext ? 'O' : 'X'}
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card className="status-message next">
      <Card.Body>
      Next player{' '}
      <span role="img" aria-label="Smiley with shades">
        😎
      </span>
      : {xIsNext ? 'X' : 'O'}
      </Card.Body>
    </Card>
  );
}

export default class GameStatus extends React.Component {
  render() {
    const status = getStatus(this.props.xIsNext, this.props.winningSquares);
    const moves = getMoves(this.props).map((val, idx) => {
      return (
        <li
          className={idx === 0 && this.props.sort ? 'first-step' : 'step'}
          key={val.move}
        >
          <Button
            className="step-button"
            onClick={() => this.props.selectStep(val.move)}
            size="sm"
            variant={
              val.desc === GAME_START_TEXT
                ? 'outline-danger'
                : 'outline-dark'
            }
          >
            {val.desc}
          </Button>
          {val.col && (
            <p className="col-row">
              Column: {val.col}, Row: {val.row}
            </p>
          )}
        </li>
      );
    });

    return (
      <div className="game-status">
        <Row>
          <Col sm={6}  md={10}>{status}</Col>
        </Row>
        <div className="easy-pad">
          <Button
            className="sort-button"
            variant="outline-info"
            onClick={this.props.sortMoves}
          >
            Sort Moves
          </Button>
        </div>
        <ol>{moves}</ol>
      </div>
    );
  }
}
