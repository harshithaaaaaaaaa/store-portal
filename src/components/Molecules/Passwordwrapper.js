import React from 'react';
import PasswordToggle from '../Atoms/Passwordtoggle';


const PasswordWrapper = ({ showPassword, onToggle, children }) => (
  <div className="password-wrapper">
    {children}
    <PasswordToggle showPassword={showPassword} onClick={onToggle} />
  </div>
);

export default PasswordWrapper;
