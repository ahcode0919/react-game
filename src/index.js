import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

function Square(props) {
  const className = props.winner ? 'winning-square square' : 'square';
  return (
    <button 
      className={className}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const winner = this.props.winningSquares.includes(i);
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winner={winner}
      />
    );
  }

  render() {
    let rows = [];
    let count = 0;
    for(let i = 0; i < 3; i++) {
      let squares = [];
      for (let j = 0; j < 3; j++) {
        squares.push(this.renderSquare(count));
        count += 1;
      }
      rows[i] = <div className="board-row">
        {squares}
      </div>;
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
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

  calculateColRow(move) {
    if (move.lastMove === null) {
      return null;
    }

    let row = 1;
    let col = 1;
    let count = 0;

    for(let i = 0; i <= move.lastMove; i++) {
      if (i === move.lastMove) {
        break;
      }
      count += 1;
      col += 1;
      if (count === 3) {
        row += 1;
        count = 0;
        col = 1;
      }
    }

    return {
      col: `${col}`,
      row: `${row}`
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    } 

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        lastMove: i,
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    let state = {
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    }

    if (step === 0) {
      state.history = [{
        squares: Array(9).fill(null)
      }]
    }

    this.setState(state);
  }

  sortMoves() {
    let currentState = Object.assign({}, this.state);
    currentState.sort = !currentState.sort;
    this.setState(currentState);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((_, move) => {
      const colRow = this.calculateColRow(history[move]);
      let desc = move ?
        'Go to move #' + move :
        'Go to game start';

      if (move === history.length - 1) {
        desc = <b>{desc}</b>
      }

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button> 
          { colRow && 
          <p className="col-row">Column: {colRow.col}, Row: {colRow.row}</p>
          }
        </li>
      );
    });

    if (!this.state.sort) {
      moves = moves.reverse();
    }
    let status = '';

    if (winner === undefined) {
      status = 'Draw!!!';
    } else if (winner) {
      status = 'Winner 💯: ' + current.squares[winner[0]];
    } else {
      status = 'Next player 😎: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    const winningSquares = winner ? winner : [-1,-1,-1]; 

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningSquares={winningSquares}
          />
        </div>
        <div className="game-status">
          <div className="easy-pad">{status}</div>
          <div className="easy-pad"><button className="sort-button" onClick={() => this.sortMoves()}>Sort Moves</button></div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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
    if (!(squares[a] && squares[b] && squares[c])) {
      draw = false;
    }

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a,b,c];
    }
  }
  if (draw) {
    return undefined;
  }
  return null;
}