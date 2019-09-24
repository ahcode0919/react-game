import React from 'react';
import { Alert, Button, Row, Col } from 'react-bootstrap';

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
      <Alert className="status-message" variant="info">
        Draw!!!
      </Alert>
    );
  } else if (winningSquares) {
    return (
      <Alert className="status-message" variant="success">
        Winner{' '}
        <span role="img" aria-label="100">
          💯
        </span>
        : {xIsNext ? 'O' : 'X'}
      </Alert>
    );
  }
  return (
    <Alert className="status-message" variant="secondary">
      Next player{' '}
      <span role="img" aria-label="Smiley with shades">
        😎
      </span>
      : {xIsNext ? 'X' : 'O'}
    </Alert>
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
                ? 'outline-warning'
                : 'outline-secondary'
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
          <Col md={8}>{status}</Col>
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
