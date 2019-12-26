import React from 'react';
import { FormFieldWrapper } from '../Form/FormFieldWrapper';

type Props = {
  error?: string;
  disabled?: boolean;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<Props> = ({
  error,
  disabled,
  label,
  name,
  value,
  onChange,
  onBlur
}) => {
  return (
    <FormFieldWrapper error={error} disabled={!!disabled}>
      <label htmlFor={name}>{label}:</label>
      <input
        disabled={disabled}
        type='text'
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <label className='error' id={`${name}-error`}>{error}</label>}
      <br/>
    </FormFieldWrapper>
)};
