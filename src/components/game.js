import React from 'react';
import Board from '../components/board';
import GameStatus from '../components/gamestatus';
import { Card, Row, Col } from 'react-bootstrap';

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

export function handleClick(squareNumber, state) {
  const history = state.history.slice(0, state.stepNumber + 1);
  const squares = history[history.length - 1].squares.slice();

  if (calculateWinner(squares) || squares[squareNumber]) {
    return;
  }

  squares[squareNumber] = state.xIsNext ? 'X' : 'O';

  return {
    history: history.concat([
      {
        lastMove: squareNumber,
        squares: squares,
      },
    ]),
    stepNumber: history.length,
    xIsNext: !state.xIsNext,
  };
}

export function jumpToStep(step) {
  let state = {
    stepNumber: step,
    xIsNext: step % 2 === 0,
  };

  if (step === 0) {
    state.history = [
      {
        squares: Array(9).fill(null),
      },
    ];
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
      history: [
        {
          lastMove: null,
          squares: Array(9).fill(null),
        },
      ],
      sort: true,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  render() {
    const currentSquares = this.state.history[this.state.stepNumber].squares;
    const winningSquares = calculateWinner(currentSquares);

    return (
      <Card className="game">
        <Row>
          <Col
            sm={{ span: 8, offset: 2 }}
            md={{ span: 5, offset: 0 }}
            lg={{ span: 6, offset: 0 }}
            className="game-board"
          >
            <Board
              squares={currentSquares}
              onClick={i => this.setState(handleClick(i, this.state))}
              winningSquares={winningSquares}
            />
          </Col>
          <Col 
            sm={12}
            md={{ span: 7, offset: 0 }}
            lg={{ span: 6, offset: 0 }}
          >
            <GameStatus
              history={this.state.history}
              selectStep={step => this.setState(jumpToStep(step))}
              sort={this.state.sort}
              sortMoves={() => this.setState(sortMoves(this.state))}
              stepNumber={this.state.stepNumber}
              xIsNext={this.state.xIsNext}
              winningSquares={winningSquares}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
