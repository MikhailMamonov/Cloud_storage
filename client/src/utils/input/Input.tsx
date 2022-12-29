import React, { FC } from 'react';
import './input.scss';

export interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

const Input: FC<InputProps> = ({ type, placeholder, value, setValue }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder={placeholder}
    ></input>
  );
};

export default Input;
