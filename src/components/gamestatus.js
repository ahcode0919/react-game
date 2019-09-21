import React from 'react';

export function calculateColRow(lastMove) {
  if (lastMove === null) {
    return null;
  }
  let row = 1;
  let col = 1;

  for(let i = 0; i < lastMove; i++) {
    if (col === 3) {
      row += 1;
      col = 1;
      continue
    }
    col += 1;
  }

  return {
    col: `${col}`,
    row: `${row}`
  }
}

export function getMoves(props) {
  let moves = props.history.map((_, move) => {
    const colRow = calculateColRow(props.history[move].lastMove);
    let desc = move ?
      'Go to move #' + move :
      'Go to game start';

    if (move === props.stepNumber) {
      desc = <b>{desc}</b>
    }

    const moveInfo = { 
      desc,
      move 
    }

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
  let status = '';

  if (winningSquares === undefined) {
    status = 'Draw!!!';
  } else if (winningSquares) {
    status = 'Winner 💯: ' + (xIsNext ? 'O': 'X');
  } else {
    status = 'Next player 😎: ' + (xIsNext ? 'X' : 'O');
  }
  return status;
}

export default class GameStatus extends React.Component {
  render () {
    const status = getStatus(this.props.xIsNext, this.props.winningSquares);
    const moves = getMoves(this.props).map((val) => {
      return (
        <li key={val.move}>
          <button className="step" onClick={() => this.props.selectStep(val.move)}>{val.desc}</button> 
          { val.col && 
          <p className="col-row">Column: {val.col}, Row: {val.row}</p>
          }
        </li>
      );
    });

    return (
      <div className="game-status">
            <div className="easy-pad">{status}</div>
            <div className="easy-pad">
              <button className="sort-button" onClick={this.props.sortMoves}>Sort Moves</button>
            </div>
            <ol>{moves}</ol>
      </div>
    )
  }
}