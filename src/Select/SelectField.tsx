import React from 'react';

type Props = {
  error?: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  options: string[];
  placeholder?: string;
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
  value,
}) => {
  const optionsWithPlaceholder = [placeholder, ...options];
  return (
    <>
      <label htmlFor={name}>{label}:</label>
      <select
        value={value || optionsWithPlaceholder[0]}
        onChange={e => onChange(e.currentTarget.value || '')}
        onBlur={e => onBlur()}
      >
        {optionsWithPlaceholder.map(option =>{
          const isPlaceholder = option === placeholder;
          return <option key={`${name}-${option}`} hidden={isPlaceholder} disabled={isPlaceholder} value={option}>
            {option}
          </option>;
        })}
      </select>
      {error && <label id={`${name}-error`}>{error}</label>}
      <br/>
    </>
)};
