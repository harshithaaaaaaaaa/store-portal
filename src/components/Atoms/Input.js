import React from 'react';

const Input = (props) => (
  <input
    type={props.type}
    id={props.id}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
    className={`input ${props.className}`}
  />
);

export default Input;
