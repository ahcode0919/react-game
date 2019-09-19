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

export default class GameStatus extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     moves: props.moves,
  //     stepNumber: props.stepNumber,
  //     winningSquares: props.winningSquares,
  //     xIsNext: props.xIsNext
  //   }
  // }

  render () {
    // const status = getStatus(this.props.xIsNext, this.props.winningSquares);
    // const moves = getMoves(this.props).map((val) => {
    //   return (
    //     <li key={val.move}>
    //       <button className="step" onClick={() => this.setState(jumpToStep(val.move))}>{val.desc}</button> 
    //       { val.col && 
    //       <p className="col-row">Column: {val.col}, Row: {val.row}</p>
    //       }
    //     </li>
    //   );
    // });

    return (
      <div className="game-status">
            <div className="easy-pad">{this.props.status}</div>
            <div className="easy-pad">
              <button className="sort-button" onClick={this.props.sortMoves}>Sort Moves</button>
            </div>
            <ol>{this.props.moves}</ol>
      </div>
    )
  }
}