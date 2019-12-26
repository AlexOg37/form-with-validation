import React from 'react';
import { FormFieldWrapper } from '../Form/FormFieldWrapper';
import { Required } from '../Form/Required';

type Props = {
  error?: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  value: string;
}

export const SelectField: React.FC<Props> = ({
  error,
  label,
  name,
  onChange,
  onBlur,
  options,
  placeholder = 'Please Select',
  required,
  value,
}) => {
  const optionsWithPlaceholder = [placeholder, ...options];
  return (
    <FormFieldWrapper error={error}>
      <label htmlFor={name}>{label}{required && <Required/>}:</label>
      <select
        id={name}
        name={name}
        value={value || optionsWithPlaceholder[0]}
        onChange={e => onChange(e.currentTarget.value || '')}
        onBlur={e => onBlur()}
      >
        {optionsWithPlaceholder.map(option =>{
          const isPlaceholder = option === placeholder;
          return <option key={`${name}-${option}`} disabled={isPlaceholder} value={option}>
            {option}
          </option>;
        })}
      </select>
      {error && <label className='error' id={`${name}-error`}>{error}</label>}
      <br/>
    </FormFieldWrapper>
)};
