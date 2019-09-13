import Game, { 
  calculateColRow,
  calculateWinner,
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

  describe('Handle click', () => {
    it('should handle click', () => {

    });
  });
});

// describe('Game component', () => {

// });