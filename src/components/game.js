import React from 'react';
import Board from '../components/board';

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

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let draw = true;

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    // Check if a possible winning combination is available
    if (!(squares[a] && squares[b] && squares[c])) {
      draw = false;
    }

    // Check for a winning combination
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }

  if (draw) {
    return undefined;
  }
  return null;
}

export function getMoves(state) {
  let moves = state.history.map((_, move) => {
    const colRow = calculateColRow(state.history[move].lastMove);
    let desc = move ?
      'Go to move #' + move :
      'Go to game start';

    if (move === state.stepNumber) {
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

  if (!state.sort) {
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

export function handleClick(squareNumber, state) {
  const history = state.history.slice(0, state.stepNumber + 1);
  const squares = history[history.length - 1].squares.slice();
  if (calculateWinner(squares) || squares[squareNumber]) {
    return;
  } 

  squares[squareNumber] = state.xIsNext ? 'X' : 'O';

  return {
    history: history.concat([{
      lastMove: squareNumber,
      squares: squares
    }]),
    stepNumber: history.length,
    xIsNext: !state.xIsNext
  }
}

export function jumpToStep(step) {
  let state = {
    stepNumber: step,
    xIsNext: (step % 2) === 0,
  }

  if (step === 0) {
    state.history = [{
      squares: Array(9).fill(null)
    }]
  }
  return state;
}

export function sortMoves(state) {
  let currentState = Object.assign({}, state);
  currentState.sort = !currentState.sort;
  return currentState;
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        lastMove: null,
        squares: Array(9).fill(null)
      }],
      sort: true,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  onClick(i) {
    this.setState(handleClick(i, this.state));
  }
  
  render() {
    const currentSquares = this.state.history[this.state.stepNumber].squares;
    const winningSquares = calculateWinner(currentSquares);
    const status = getStatus(this.state.xIsNext, winningSquares);
    const moves = getMoves(this.state).map((val) => {
      return (
        <li key={val.move}>
          <button onClick={() => this.setState(jumpToStep(val.move))}>{val.desc}</button> 
          { val.col && 
          <p className="col-row">Column: {val.col}, Row: {val.row}</p>
          }
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={currentSquares}
            onClick={(i) => this.onClick(i)}
            winningSquares={winningSquares}
          />
        </div>
        <div className="game-status">
          <div className="easy-pad">{status}</div>
          <div className="easy-pad">
            <button className="sort-button" onClick={() => this.setState(sortMoves(this.state))}>Sort Moves</button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}