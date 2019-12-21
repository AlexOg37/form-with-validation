import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App renders Submit button', () => {
  const { getByText } = render(<App />);
  const submitButton = getByText('Submit');
  expect(submitButton).toBeInTheDocument();
});

test('App renders First name field', () => {
  const { getByText } = render(<App />);
  const firstNameField = getByText('First name:');
  expect(firstNameField).toBeInTheDocument();
});

test('App renders Last name field', () => {
  const { getByText } = render(<App />);
  const lastNameField = getByText('Last name:');
  expect(lastNameField).toBeInTheDocument();
});
