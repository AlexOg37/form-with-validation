import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';
import { formData } from './formData';

test('Form renders Submit button', () => {
  const { getByText } = render(<Form />);
  const submitButton = getByText(formData.submitButton);
  expect(submitButton).toBeInTheDocument();
});

test('Form renders First name field', () => {
  const { getByText } = render(<Form />);
  const firstNameField = getByText(`${formData.nameLabel}:`);
  expect(firstNameField).toBeInTheDocument();
});

test('Form renders Last name field', () => {
  const { getByText } = render(<Form />);
  const lastNameField = getByText(`${formData.surnameLabel}:`);
  expect(lastNameField).toBeInTheDocument();
});
