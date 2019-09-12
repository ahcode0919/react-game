import React from 'react';

export function getClassName(winner) {
  return winner ? 'winning-square square' : 'square';
}

export default function Square(props) {  
  return (
    <button 
      className={getClassName(props.winner)}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}