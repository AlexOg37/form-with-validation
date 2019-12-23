import React from 'react';
// import Select from 'react-select';

export const tempSelectOptions: string[] = [
  'Select country',
  'option1',
  'option2',
  'option3'
]

type OptionType = {value: string, label: string};

type Props = {
  error?: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  options: string[];
  value: string;
}

export const SelectField: React.FC<Props> = ({
  error,
  label,
  name,
  onChange,
  onBlur,
  options,
  value,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}:</label>
      <select
        value={value || options[0]}
        onChange={e => onChange(e.currentTarget.value || '')}
        onBlur={e => onBlur()}
      >
        {options.map(option =>
          <option key={option} hidden={option === 'Select country'} disabled={option === 'Select country'} value={option}>{option}</option>
        )}
      </select>
      {error && <label id={`${name}-error`}>{error}</label>}
      <br/>
    </>
)};
