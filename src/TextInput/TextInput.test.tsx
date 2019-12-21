import React from 'react';
import { render } from '@testing-library/react';
import { TextInput } from './TextInput';

test('TextInput renders label and input', () => {
  const label = 'testLabel';
  const value = 'testValue';
  const { getByDisplayValue, getByText } = render(<TextInput
    label={label}
    name='name'
    value={value}
    onBlur={()=>{}}
    onChange={()=>{}}
  />);
  const labelElement = getByText(`${label}:`);
  expect(labelElement).toBeInTheDocument();
  const inputElement = getByDisplayValue(value);
  expect(inputElement).toBeInTheDocument();
});

test("TextInput renders error if error message provided", () => {
  const error = 'test error message';
  const { getByText } = render(<TextInput
    label=''
    name='name'
    value=''
    error={error}
    onBlur={()=>{}}
    onChange={()=>{}}
  />);
  const errorElement = getByText(error);
  expect(errorElement).toBeInTheDocument();
});
