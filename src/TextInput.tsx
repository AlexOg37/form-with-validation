import React from 'react';
import { Values } from './actions';

type Props = {
  error?: string;
  label: string;
  name: keyof Values;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<Props> = ({
  error,
  label,
  name,
  value,
  onChange,
  onBlur
}) => {
  return (
    <>
      <label htmlFor={name}>{label}:</label>
      <input type='text' name={name} value={value} onChange={onChange} onBlur={onBlur}/>
      {error && <label>{error}</label>}
    </>
)};