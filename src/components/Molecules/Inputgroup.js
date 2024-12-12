import React from 'react';
import Label from '../Atoms/Label';
import Input from '../Atoms/Input';


const InputGroup = ({ id, value, onChange, label, type, placeholder }) => (
  <div className="input-group">
    <Label htmlFor={id}>{label}</Label>
    <Input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default InputGroup;
