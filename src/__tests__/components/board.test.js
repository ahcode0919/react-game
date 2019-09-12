import React from 'react';
import Board, { isWinner } from '../../components/board';
import Square from '../../components/square';
import { mount, shallow } from 'enzyme';

describe('Board helpers', () => {
  const props = {
    onClick: jest.fn(),
    squares: ['', 'X', '', '', '', '', '', '', ''],
    winningSquares: [1]
  };

  it('should determine if square is winner', () => {
    expect(isWinner(1, props)).toBe(true);
    expect(isWinner(2, props)).toBe(false);
  });

  it('should render square', () => {
    const wrapper = shallow(Board.renderSquare(1, props));
    expect(wrapper.props().children).toBe('X');
    expect(wrapper.props().className).not.toBeNull();
  });
});

describe('Board component', () => {
  const props = {
    onClick: jest.fn(),
    squares: ['X', 'X', 'X', 'O', '', 'O', 'O', '', ''],
    winningSquares: [0, 1, 2]
  };

  it('should render', () => {
    shallow(<Board {...props}/>);
  });

  it('should be a 3x3 Board', () => {
    const wrapper = mount(<Board {...props}/>);
    expect(wrapper.find(Square)).toHaveLength(9);
    expect(wrapper.find('.board-row')).toHaveLength(3);
    expect(wrapper.find('.winning-square')).toHaveLength(3);
  });

  it('should add click handlers', () => {
    const wrapper = mount(<Board {...props}/>);
    wrapper.find('.square').first().simulate('click');
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});