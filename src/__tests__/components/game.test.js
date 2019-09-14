import React from 'react';

import Game, { 
  calculateColRow,
  calculateWinner,
  getMoves,
  getStatus,
  handleClick,
  jumpToStep,
  sortMoves 
} from '../../components/game';

import { shallow } from 'enzyme';

describe('Game Helpers', () => {
  describe('Calculate column and row', () => {
    it('should return null if no last move', () => {
      expect(calculateColRow(null)).toBeNull();
    });

    it('should calculate correct column and row', () => {
      expect(calculateColRow(0)).toStrictEqual({ col: "1", row: "1" });
      expect(calculateColRow(3)).toStrictEqual({ col: "1", row: "2" });
      expect(calculateColRow(5)).toStrictEqual({ col: "3", row: "2" });
      expect(calculateColRow(8)).toStrictEqual({ col: "3", row: "3" });
    });
  });

  describe('Calculate winner', () => {
    const drawSquares = ['X', 'O', 'X', 'O', 'O', "X", 'X', 'X', 'O'];
    const winningSquares = ['X', 'X', 'X', 'O', 'O', "X", 'O', '', ''];
    const noWinnerWquares = ['', '', 'X', '', 'O', "X", '', '', 'O'];

    it('should return undefined for a draw', () => {
      expect(calculateWinner(drawSquares)).toBeUndefined();
    });

    it('should return null if not a draw and no winner', () => {
      expect(calculateWinner(noWinnerWquares)).toBeNull();
    });

    it('should return winning square indexes', () => {
      expect(calculateWinner(winningSquares)).toEqual([0, 1, 2]);
    });
  });

  describe('Get moves', () => {
    const baseState = {
      history: [{
        lastMove: null,
        squares: Array(9).fill(null)
      }],
      stepNumber: 0
    }

    it('should get move info for new game', () => {
      const moves = getMoves(baseState);

      expect(moves.length).toBe(1);
      expect(moves[0].desc).toEqual(<b>Go to game start</b>);
      expect(moves[0].col).toBeUndefined();
      expect(moves[0].row).toBeUndefined();
    });

    it('should get move info', () => {
      const state = Object.assign({}, baseState);
      state.history = state.history.concat([{
        lastMove: 0,
        squares: ['X', '', '', '', '', '', '', '', '']
      }]);
      state.stepNumber = 1;
      state.sort = true;
      const moves = getMoves(state);

      expect(moves.length).toBe(2);
      expect(moves[1].desc).toEqual(<b>Go to move #1</b>);
      expect(moves[1].col).toBe('1');
      expect(moves[1].row).toBe('1');
    });

    it('should get reversed move info', () => {
      const state = Object.assign({}, baseState);
      state.history = state.history.concat([{
        lastMove: 0,
        squares: ['X', '', '', '', '', '', '', '', '']
      }]);
      state.stepNumber = 1;
      state.sort = false;
      const moves = getMoves(state);

      expect(moves.length).toBe(2);
      expect(moves[0].desc).toEqual(<b>Go to move #1</b>);
      expect(moves[1].desc).toEqual('Go to game start');
    });
  });

  describe('Get status', () => {
    it('should get draw status', () => {
      expect(getStatus(true, undefined)).toBe('Draw!!!');
    });

    it('should get winner status', () => {
      expect(getStatus(true, [])).toBe('Winner 💯: O');
    });

    it('should get next player status', () => {
      expect(getStatus(true, null)).toBe('Next player 😎: X');
    });
  });

  describe('Handle click', () => {
    const state = {
      history: [{
        lastMove: null,
        squares: Array(9).fill(null)
      }, {
        lastMove: 0,
        squares: ['X', null, null, null, null, null, null, null, null]
      }],
      stepNumber: 1,
      xIsNext: false
    }

    it('should handle click', () => {
      const newState = handleClick(2, state);
      expect(newState.xIsNext).toBe(true);
      expect(newState.stepNumber).toBe(2);
      expect(newState.history[2].lastMove).toBe(2);
      expect(newState.history[2].squares).toStrictEqual(['X', null, 'O', null, null, null, null, null, null]);
    });

    it('should not handle click for previously selected tile', () => {
      expect(handleClick(0, state)).toBeUndefined();
    });

    it('should not handle click when game is complete', () => {
      const winningState = Object.assign({}, state);
      winningState.history[1].squares = ['X', 'X', 'X', null, null, null, null, null, null];
      expect(handleClick(3, state)).toBeUndefined();
    });
  });

  describe('Jump to step', () => {
    it('should clear the history if "Go to game start" is selected', () => {
      const state = jumpToStep(0);
      expect(state.stepNumber).toBe(0);
      expect(state.xIsNext).toBe(true);
      expect(state.history).toStrictEqual([{ squares: Array(9).fill(null) }]);
    });

    it('should return correct step number and next turn', () => {
      const state = jumpToStep(1);
      expect(state.stepNumber).toBe(1);
      expect(state.xIsNext).toBe(false);
      expect(state.history).toBeUndefined();
    });
  });

  describe('Sort moves', () => {
    it('should sort moves', () => {
      const state = {
        sort: false
      }
      expect(sortMoves(state).sort).toBe(true);
    });
  });
});

// describe('Game component', () => {

// });