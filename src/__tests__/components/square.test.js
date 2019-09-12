import Square, { getClassName } from '../../components/square';
import { shallow } from 'enzyme';

describe('Square helper functions', () => {
  it('should get correct class name', () => {
    expect(getClassName(true)).toBe('winning-square square');
    expect(getClassName(false)).toBe('square');
  });
});

describe('Square component', () => {
  const props = {
    onClick: jest.fn(),
    value: 'X',
    winner: false
  }

  it('should render', () => {
    shallow(Square(props));
  });

  it('should assign props', () => {
    const wrapper = shallow(Square(props));
    wrapper.simulate('click');

    expect(props.onClick).toHaveBeenCalledTimes(1);
    expect(wrapper.props().children).toBe('X');
    expect(wrapper.props().className).not.toBeNull();
  });
});