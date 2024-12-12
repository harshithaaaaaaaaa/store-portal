import React from 'react';

const Button = (props) => (
  <button onClick={props.onClick} className={`button ${props.className}`}>
    {props.children}
  </button>
);

export default Button;
