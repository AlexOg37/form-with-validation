import React from 'react';
import { FormFieldWrapper } from '../Form/FormFieldWrapper';
import { Required } from '../Form/Required';

type Props = {
  error?: string;
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<Props> = ({
  error,
  disabled,
  label,
  name,
  required,
  value,
  onChange,
  onBlur
}) => {
  return (
    <FormFieldWrapper error={error}>
      <label htmlFor={name}>{label}{required && <Required/>}:</label>
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
