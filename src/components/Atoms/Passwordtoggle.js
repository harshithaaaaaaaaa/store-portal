import React from 'react';

const PasswordToggle = (props) => (
  <i
    className={`password-toggle fas fa-eye${props.showPassword ? '-slash' : ''}`}
    onClick={props.onClick}
  ></i>
);

export default PasswordToggle;
