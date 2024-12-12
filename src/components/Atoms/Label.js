import React from 'react';

const Label = (props) => (
  <label htmlFor={props.htmlFor} className="label">
    {props.children}
  </label>
);

export default Label;
