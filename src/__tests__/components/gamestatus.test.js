import React from 'react';
import { Alert } from 'react-bootstrap';

import { mount, shallow } from 'enzyme';

import {
  calculateColRow,
  getMoves,
  getStatus,
} from '../../components/gamestatus';

describe('Game Status helpers', () => {
  describe('Calculate column and row', () => {
    it('should return null if no last move', () => {
      expect(calculateColRow(null)).toBeNull();
    });

    it('should calculate correct column and row', () => {
      expect(calculateColRow(0)).toStrictEqual({ col: '1', row: '1' });
      expect(calculateColRow(3)).toStrictEqual({ col: '1', row: '2' });
      expect(calculateColRow(5)).toStrictEqual({ col: '3', row: '2' });
      expect(calculateColRow(8)).toStrictEqual({ col: '3', row: '3' });
    });
  });

  describe('Get moves', () => {
    const baseState = {
      history: [
        {
          lastMove: null,
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
    };

    it('should get move info for new game', () => {
      const moves = getMoves(baseState);

      expect(moves.length).toBe(1);
      expect(moves[0].desc).toEqual(<b>Go to game start</b>);
      expect(moves[0].col).toBeUndefined();
      expect(moves[0].row).toBeUndefined();
    });

    it('should get move info', () => {
      const state = Object.assign({}, baseState);
      state.history = state.history.concat([
        {
          lastMove: 0,
          squares: ['X', '', '', '', '', '', '', '', ''],
        },
      ]);
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
      state.history = state.history.concat([
        {
          lastMove: 0,
          squares: ['X', '', '', '', '', '', '', '', ''],
        },
      ]);
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
      const wrapper = shallow(getStatus(true, undefined));
      expect(wrapper.html()).toBe(
        '<div role="alert" class="fade status-message alert alert-info show">Draw!!!</div>'
      );
    });

    it('should get winner status', () => {
      const wrapper = shallow(getStatus(true, []));
      expect(wrapper.html()).toBe(
        '<div role="alert" class="fade status-message alert alert-success show">Winner <span role="img" aria-label="100">💯</span>: O</div>'
      );
    });

    it('should get next player status', () => {
      const wrapper = shallow(getStatus(true, null));
      expect(wrapper.html()).toBe(
        '<div role="alert" class="fade status-message alert alert-secondary show">Next player <span role="img" aria-label="Smiley with shades">😎</span>: X</div>'
      );
    });
  });
});

describe('Game Status component', () => {
  it('should render', () => {});
});
