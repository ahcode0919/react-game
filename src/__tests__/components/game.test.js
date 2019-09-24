import React from 'react';

import Game, {
  calculateWinner,
  handleClick,
  jumpToStep,
  sortMoves,
} from '../../components/game';

import { mount, shallow } from 'enzyme';

describe('Game Helpers', () => {
  describe('Calculate winner', () => {
    const drawSquares = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];
    const winningSquares = ['X', 'X', 'X', 'O', 'O', 'X', 'O', '', ''];
    const noWinnerWquares = ['', '', 'X', '', 'O', 'X', '', '', 'O'];

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

  describe('Handle click', () => {
    const state = {
      history: [
        {
          lastMove: null,
          squares: Array(9).fill(null),
        },
        {
          lastMove: 0,
          squares: ['X', null, null, null, null, null, null, null, null],
        },
      ],
      stepNumber: 1,
      xIsNext: false,
    };

    it('should handle click', () => {
      const newState = handleClick(2, state);
      expect(newState.xIsNext).toBe(true);
      expect(newState.stepNumber).toBe(2);
      expect(newState.history[2].lastMove).toBe(2);
      expect(newState.history[2].squares).toStrictEqual([
        'X',
        null,
        'O',
        null,
        null,
        null,
        null,
        null,
        null,
      ]);
    });

    it('should not handle click for previously selected tile', () => {
      expect(handleClick(0, state)).toBeUndefined();
    });

    it('should not handle click when game is complete', () => {
      const winningState = Object.assign({}, state);
      winningState.history[1].squares = [
        'X',
        'X',
        'X',
        null,
        null,
        null,
        null,
        null,
        null,
      ];
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
        sort: false,
      };
      expect(sortMoves(state).sort).toBe(true);
    });
  });
});

describe('Game component', () => {
  it('should render', () => {
    shallow(<Game />);
  });

  it('should update square state on click', () => {
    const wrapper = mount(<Game />);
    const square = wrapper
      .find('.square')
      .first()
      .simulate('click');
    expect(square.text()).toBe('X');
  });

  it('should jump to move when history list is clicked', () => {
    const wrapper = mount(<Game />);
    wrapper
      .find('.square')
      .first()
      .simulate('click');
    const firstStep = wrapper.find('.first-step');
    const step = wrapper.find('.step');

    expect(step).toHaveLength(1);
    expect(firstStep).toHaveLength(1);
    expect(step.text()).toBe('Go to move #1Column: 1, Row: 1');

    wrapper
      .find('.first-step')
      .first()
      .simulate('click');
    expect(wrapper.find('.first-step').text()).toBe('Go to game start');
  });

  it('should sort move list', () => {
    const wrapper = mount(<Game />);
    wrapper
      .find('.square')
      .first()
      .simulate('click');
    wrapper
      .find('.sort-button')
      .first()
      .simulate('click');
    let steps = wrapper.find('.step');

    expect(steps.first().text()).toBe('Go to move #1Column: 1, Row: 1');
    expect(steps.last().text()).toBe('Go to game start');
    expect(steps).toHaveLength(2);
  });
});
