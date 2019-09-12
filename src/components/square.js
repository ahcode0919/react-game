import React from 'react';

export default function Square(props) {
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